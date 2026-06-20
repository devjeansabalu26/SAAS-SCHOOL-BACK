import {
  BadRequestException,
} from '@nestjs/common';

export class InvalidTenantException
  extends BadRequestException {

  constructor() {
    super(
      'Tenant inválido',
    );
  }
}