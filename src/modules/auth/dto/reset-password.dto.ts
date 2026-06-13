import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'usuario@correo.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '483921',
    description: 'Código de recuperación enviado al correo',
  })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({
    example: 'NuevaPassword123',
    description: 'Nueva contraseña',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({
    example: 'NuevaPassword123',
    description: 'Confirmación de la nueva contraseña',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  confirmPassword!: string;
}