import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Email único del usuario',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario (mínimo 8 caracteres)',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty({
    example: '1',
    description: 'ID del tenant (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({
    example: 'invitado',
    description: 'Tipo de usuario inicial para nuevo registro',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipoUsuario?: string;

  @ApiProperty({
    example: 'juan.perez',
    description: 'Nombre de usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;
}
