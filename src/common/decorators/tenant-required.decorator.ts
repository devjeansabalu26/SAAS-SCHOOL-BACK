import { SetMetadata } from '@nestjs/common';

export const TENANT_REQUIRED =
  'tenant-required';

export const TenantRequired = () =>
  SetMetadata(
    TENANT_REQUIRED,
    true,
  );