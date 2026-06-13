import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

/**
 * DTO para actualizar parcialmente un usuario.
 * Todos los campos son opcionales.
 */
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
