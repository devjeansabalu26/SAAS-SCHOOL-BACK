import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const Tenant =
  createParamDecorator(
    (
      data: unknown,
      ctx: ExecutionContext,
    ): number | null => {

      const request =
        ctx.switchToHttp().getRequest();

      const tenantId =
        request.user?.tenantId ??
        request.headers['x-tenant-id'] ??
        request.body?.tenantId ??
        request.query?.tenantId;

      return tenantId
        ? Number(tenantId)
        : null;
    },
  );