import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Email del usuario para enviar el enlace de recuperación',
  })
  @IsEmail()
  email!: string;
}
