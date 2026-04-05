import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function Protected() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth('Bearer'),
    ApiUnauthorizedResponse({ description: 'Token inválido o expirado' }),
  );
}
