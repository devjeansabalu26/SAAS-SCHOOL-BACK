import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../auth.constants';
import { UsuariosService } from '../../usuarios/usuarios.service';

export interface JwtPayload {
  email: string;
  sub: number;
  tenantId?: string;
  sessionId: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.email || !payload.sub || !payload.sessionId) {
      throw new UnauthorizedException('Token JWT inválido: faltan datos requeridos');
    }

    const user = await this.usuariosService.findById(payload.sub);
    if (!user || user.sessionId !== payload.sessionId) {
      throw new UnauthorizedException('Sesión inválida o caducada');
    }

    return {
      userId: payload.sub,
      id: payload.sub,
      email: payload.email,
      tenantId: payload.tenantId,
      sessionId: payload.sessionId,
    };
  }
}
