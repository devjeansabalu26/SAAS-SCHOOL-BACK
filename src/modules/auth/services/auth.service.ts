import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomBytes, randomInt } from 'crypto';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { LoginLogService } from '../login-log.service';
import { RegisterDto } from '../dto/register.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { jwtConstants } from '../auth.constants';
import { MailService } from 'src/common/mail/mail.service';
import { VerifyCodeDto } from '../dto/verify-code.dto';

export interface JwtPayload {
  email: string;
  sub: number;
  tenantId?: number;
  sessionId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly loginLogService: LoginLogService,
    private readonly mailService:MailService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usuariosService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const { password: _, currentHashedRefreshToken, sessionId, ...result } = user;
    return result;
  }

  private generateSessionId() {
    return randomBytes(24).toString('hex');
  }

  private generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiresIn,
    });
  }

  private generateRefreshToken(payload: { sub: number; sessionId: string }) {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: jwtConstants.refreshExpiresIn,
    });
  }

  private async storeSession(userId: number, sessionId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usuariosService.updateSession(userId, sessionId, hashedRefreshToken);
  }

  async login(user: any, ip?: string, userAgent?: string) {
    const sessionId = this.generateSessionId();
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      tenantId: user.tenantId,
      sessionId,
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken({ sub: user.id, sessionId });

    await this.storeSession(user.id, sessionId, refreshToken);

    await this.loginLogService.create({
      usuarioId: user.id,
      tenantId: typeof user.tenantId === 'number' ? user.tenantId : undefined,
      ip,
      userAgent,
      exitoso: true,
    });

    return {
      access_token: accessToken,
      expires_in: jwtConstants.expiresIn,
      refresh_token: refreshToken,
      refresh_expires_in: jwtConstants.refreshExpiresIn,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        tenantId: user.tenantId?.toString(),
        tipoUsuario: user.tipoUsuario,
        fotoUrl: user.fotoUrl,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<{ sub: number; sessionId: string }>(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
      const user = await this.usuariosService.findById(payload.sub);
      if (!user || !user.currentHashedRefreshToken) {
        throw new UnauthorizedException('Refresh token inválido');
      }

      const refreshMatches = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);
      if (!refreshMatches || user.sessionId !== payload.sessionId) {
        throw new UnauthorizedException('Refresh token no válido o sesión inválida');
      }

      const sessionId = this.generateSessionId();
      const accessToken = this.generateAccessToken({
        email: user.email,
        sub: user.id,
        tenantId: user.tenantId,
        sessionId,
      });
      const newRefreshToken = this.generateRefreshToken({ sub: user.id, sessionId });
      await this.storeSession(user.id, sessionId, newRefreshToken);

      return {
        access_token: accessToken,
        expires_in: jwtConstants.expiresIn,
        refresh_token: newRefreshToken,
        refresh_expires_in: jwtConstants.refreshExpiresIn,
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  async logout(userId: number) {
    await this.usuariosService.clearSession(userId);
  }

  async loginFailed(usuarioId: number, tenantId?: number | string, ip?: string, userAgent?: string) {
    await this.loginLogService.create({
      usuarioId,
      tenantId: tenantId ? parseInt(String(tenantId), 10) : undefined,
      ip,
      userAgent,
      exitoso: false,
    });
  }

  async register(registerDto: RegisterDto) {
    const existing = await this.usuariosService.findByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException('El email ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const usuario = await this.usuariosService.create({
      email: registerDto.email,
      password: hashedPassword,
      nombre: registerDto.nombre,
      username: registerDto.username || registerDto.email,
      tenantId: registerDto.tenantId,
      tipoUsuario: registerDto.tipoUsuario || 'invitado',
    } as any);

    const { password: _, currentHashedRefreshToken, sessionId, ...result } = usuario;
    return result;
  }

  async forgotPassword(
    dto: ForgotPasswordDto,
  ) {

    const user =
      await this.usuariosService.findByEmail(
        dto.email,
      );

    if (!user) {
      throw new BadRequestException(
        'No existe una cuenta asociada a este correo electrónico.',
      );
    }

    const code =
      randomInt(
        100000,
        1000000,
      ).toString();

    const hashedCode =
      await bcrypt.hash(
        code,
        10,
      );

    const expiration =
      new Date(
        Date.now() +
        10 * 60 * 1000,
      );

    await this.usuariosService.update(
      String(user.id),
      {
        tokenRecuperacion: hashedCode,
        tokenExpiracion: expiration,
      },
    );

    await this.mailService.sendRecoveryCode(
      user.email,
      code,
    );

    return {
      success: true,
      message:
        'Se ha enviado el código de recuperación a su correo electrónico.',
    };
  }

  async verifyCode(
    dto: VerifyCodeDto,
  ) {

    const user =
      await this.usuariosService.findByEmail(
        dto.email,
      );

    if (!user) {
      throw new BadRequestException(
        'Código inválido',
      );
    }

    if (
      !user.tokenExpiracion ||
      user.tokenExpiracion <
        new Date()
    ) {
      throw new BadRequestException(
        'El código ha expirado',
      );
    }
  if (!user.tokenRecuperacion) {
    throw new BadRequestException(
      'No existe un código de recuperación válido',
    );
  }
    const valid =
      await bcrypt.compare(
        dto.code,
        user.tokenRecuperacion,
      );

    if (!valid) {
      throw new BadRequestException(
        'Código incorrecto',
      );
    }

    return {
      success: true,
      message: 'Código válido',
    };
  }
  async resetPassword(
    dto: ResetPasswordDto                 ,
  ) {

    const user =
      await this.usuariosService.findByEmail(
        dto.email,
      );

    if (!user) {
      throw new BadRequestException(
        'Solicitud inválida',
      );
    }

    if (
      !user.tokenExpiracion ||
      user.tokenExpiracion <
        new Date()
    ) {
      throw new BadRequestException(
        'El código ha expirado',
      );
    }
    if (!user.tokenRecuperacion) {
      throw new BadRequestException(
        'El código no existe o ha expirado',
      );
    }
    const valid =
      await bcrypt.compare(
        dto.code,
        user.tokenRecuperacion,
      );

    if (!valid) {
      throw new BadRequestException(
        'Código inválido',
      );
    }

    if (
      dto.password !==
      dto.confirmPassword
    ) {
      throw new BadRequestException(
        'Las contraseñas no coinciden',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        dto.password,
        10,
      );

    await this.usuariosService.update(
      String(user.id),
      {
        password: hashedPassword,
        tokenRecuperacion: undefined,
        tokenExpiracion: undefined,
      },
    );

    return {
      success: true,
      message:
        'Contraseña actualizada correctamente.',
    };
  }
}
