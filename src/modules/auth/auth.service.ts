import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginLogService } from './login-log.service';
import { RegisterDto } from './dto/register.dto';
import { jwtConstants } from './auth.constants';

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
    console.log('Registering user:', registerDto);
    const existing = await this.usuariosService.findByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException('El email ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const usuario = await this.usuariosService.create({
      email: registerDto.email,
      password: hashedPassword,
      nombre: registerDto.nombre,
      tenantId:
        registerDto.tenantId !== undefined
          ? Number(registerDto.tenantId)
          : undefined,
    } as any);

    const { password: _, currentHashedRefreshToken, sessionId, ...result } = usuario;
    return result;
  }
}
