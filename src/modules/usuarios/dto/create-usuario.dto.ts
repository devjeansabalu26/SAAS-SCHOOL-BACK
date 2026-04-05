import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    example: '1',
    description: 'ID del usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  Id?: string;

  @ApiProperty({
    example: 'juan.perez',
    description: 'Nombre de usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Email único del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Administrador',
    description: 'Tipo de usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipoUsuario?: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({
    example: 'Pérez García',
    description: 'Apellidos del usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  apellidos?: string;

  @ApiProperty({
    example: '+51998765432',
    description: 'Teléfono del usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({
    example: '1',
    description: 'ID del tenant (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @IsOptional()
  @IsString()
  fotoUrl?: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario (mínimo 8 caracteres)',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 0,
    description: 'Intentos fallidos de login (opcional)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  intentosFallidos?: number;

  @ApiProperty({
    example: false,
    description: 'Si el usuario está bloqueado (opcional)',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  bloqueado?: boolean;

  @ApiProperty({
    example: false,
    description: 'Si el email está verificado (opcional)',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  emailVerificado?: boolean;

  @ApiProperty({
    example: 'activo',
    description: 'Estado del usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiProperty({
    example: 'token123abc',
    description: 'Token de recuperación de contraseña (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  tokenRecuperacion?: string;

  @ApiProperty({
    example: '2025-05-04T12:00:00Z',
    description: 'Fecha de expiración del token (opcional)',
    required: false,
  })
  @IsOptional()
  tokenExpiracion?: Date;

  @ApiProperty({
    example: '2025-04-04T10:30:00Z',
    description: 'Último login del usuario (opcional)',
    required: false,
  })
  @IsOptional()
  ultimoLogin?: Date;
}
