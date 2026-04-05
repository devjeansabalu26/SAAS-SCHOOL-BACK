import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';

/**
 * Decorador para extraer el Tenant ID de la solicitud.
 * Busca en el siguiente orden:
 * 1. request.user.tenantId (desde JWT)
 * 2. request.headers['x-tenant-id'] (header personalizado)
 * 3. request.body?.tenantId (desde body)
 * 4. request.query?.tenantId (desde query params)
 */
export const Tenant = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  
  // Prioridad 1: Del JWT autenticado
  if (request.user?.tenantId) {
    return request.user.tenantId;
  }
  
  // Prioridad 2: Header personalizado
  if (request.headers['x-tenant-id']) {
    return request.headers['x-tenant-id'];
  }
  
  // Prioridad 3: Body
  if (request.body?.tenantId) {
    return request.body.tenantId;
  }
  
  // Prioridad 4: Query params
  if (request.query?.tenantId) {
    return request.query.tenantId;
  }
  
  // Si no se encuentra tenant ID, retornar undefined (algunos endpoints no lo requieren)
  return null;
});
