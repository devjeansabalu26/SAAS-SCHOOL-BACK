import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

/**
 * Guard para manejar multi-tenancy.
 * Enriquece el request con datos de tenant desde diferentes fuentes:
 * 1. Usuario autenticado (JWT)
 * 2. Headers personalizados
 * 3. Body o Query params
 */
@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Si el usuario está autenticado, usar su tenantId
    if (request.user?.tenantId) {
      request.tenantId = request.user.tenantId;
      return true;
    }
    
    // Buscar en headers personalizados
    const tenantFromHeader = request.headers['x-tenant-id'];
    if (tenantFromHeader) {
      request.tenantId = tenantFromHeader;
      return true;
    }
    
    // Buscar en body
    if (request.body?.tenantId) {
      request.tenantId = request.body.tenantId;
      return true;
    }
    
    // Buscar en query params
    if (request.query?.tenantId) {
      request.tenantId = request.query.tenantId;
      return true;
    }
    
    // Si no se encuentra tenantId, permitir (algunos endpoints no lo requieren)
    // o requerir según la necesidad del negocio
    request.tenantId = null;
    return true;
  }
}
