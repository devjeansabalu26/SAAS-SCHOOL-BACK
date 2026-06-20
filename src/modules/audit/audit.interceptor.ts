import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuditService } from "./audit.service";
import { Observable, tap } from "rxjs";
import { AUDIT_KEY } from "./audit.decorator";

@Injectable()
export class AuditIntercept implements NestInterceptor
{
  constructor(
    private readonly reflector: Reflector,
    private readonly auditService:
      AuditService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {

    const action =
      this.reflector.get<string>(
        AUDIT_KEY,
        context.getHandler(),
      );

    if (!action) {
      return next.handle();
    }

    const request =
      context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(async response => {

        await this.auditService.registrar({
          tenantId:
            request.user?.tenantId,
          usuarioId:
            request.user?.id,
          accion: action,
          modulo:
            context.getClass().name,
          dataNueva:
            response,
        });

      }),
    );
  }
}