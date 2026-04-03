import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateUsuarioDto {
  @IsOptional()
  @IsString()
  Id?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  tipoUsuario?: string;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellidos?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  fotoUrl?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  intentosFallidos?: number;

  @IsOptional()
  @IsBoolean()
  bloqueado?: boolean;

  @IsOptional()
  @IsBoolean()
  emailVerificado?: boolean;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  tokenRecuperacion?: string;

  @IsOptional()
  tokenExpiracion?: Date;

  @IsOptional()
  ultimoLogin?: Date;
}
