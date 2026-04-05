import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard para validar JWT en rutas protegidas.
 * Extiende AuthGuard('jwt') para proporcionar mejor manejo de errores.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      const message =
        info?.message ||
        err?.message ||
        'Token no proporcionado o inválido';

      throw new UnauthorizedException({
        message,
        error: 'Unauthorized',
        statusCode: 401,
      });
    }

    return user;
  }
}
