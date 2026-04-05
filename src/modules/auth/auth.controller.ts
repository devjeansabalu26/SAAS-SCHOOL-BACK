import { Body, Controller, Post, Request, UseGuards, Headers } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiHeader,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description: 'Crea una nueva cuenta de usuario con email y contraseña',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'Datos para crear una nueva cuenta',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    schema: {
      example: {
        id: 1,
        email: 'usuario@example.com',
        nombre: 'Juan Pérez',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'El email ya está registrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Autentica un usuario con email y contraseña, retorna tokens JWT y refresh token',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciales de acceso',
  })
  @ApiHeader({
    name: 'user-agent',
    description: 'User-Agent del navegador o cliente',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Autenticación exitosa',
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        expires_in: '2h',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refresh_expires_in: '7d',
        user: {
          id: 1,
          email: 'usuario@example.com',
          nombre: 'Juan Pérez',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  async login(
    @Request() req,
    @Headers('user-agent') userAgent?: string,
  ) {
    const ip = req.ip || req.connection?.remoteAddress || 'unknown';
    return this.authService.login(req.user, ip, userAgent);
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refrescar token',
    description: 'Genera un nuevo access token a partir de un refresh token válido',
  })
  @ApiBody({
    schema: {
      example: {
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Token renovado exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token inválido o expirado',
  })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({
    summary: 'Cerrar sesión',
    description: 'Finaliza la sesión actual y anula el refresh token',
  })
  @ApiResponse({
    status: 200,
    description: 'Sesión cerrada correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async logout(@Request() req) {
    return this.authService.logout(req.user.userId);
  }
}
