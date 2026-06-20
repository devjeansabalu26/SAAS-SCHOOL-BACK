import {
  ForbiddenException,
} from '@nestjs/common';

export class TenantAccessDeniedException
  extends ForbiddenException {

  constructor() {
    super(
      'No tiene acceso a este tenant',
    );
  }
}