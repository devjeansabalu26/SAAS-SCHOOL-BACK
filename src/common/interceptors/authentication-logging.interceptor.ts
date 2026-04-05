import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Interceptor para loguear detalles de autenticación en cada solicitud.
 * Útil para debugging de problemas de autenticación y autorización.
 */
@Injectable()
export class AuthenticationLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Auth');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, path, headers } = request;
    const authHeader = headers.authorization;
    const user = request.user;
    const tenantId = request.tenantId;

    const authInfo = {
      method,
      path,
      hasAuth: !!authHeader,
      authenticatedUser: user?.email || 'anónimo',
      userId: user?.userId,
      tenantId: tenantId || user?.tenantId || 'no-asignado',
    };

    this.logger.debug(`Solicitud autenticada: ${JSON.stringify(authInfo)}`);

    return next.handle().pipe(
      tap(() => {
        this.logger.debug(
          `Respuesta exitosa: ${method} ${path} - ${user?.email || 'anónimo'}`,
        );
      }),
    );
  }
}
