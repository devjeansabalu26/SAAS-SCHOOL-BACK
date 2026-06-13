import {
  Body,
  Controller,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './services/auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { VerifyCodeDto } from './dto/verify-code.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar nuevo usuario',
  })
  @ApiBody({
    type: RegisterDto,
  })
  register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(
      registerDto,
    );
  }

  @Post('verify-code')
  @ApiOperation({
    summary: 'Verificar código de recuperación',
  })
  verifyCode(
    @Body() dto: VerifyCodeDto,
  ) {
    return this.authService.verifyCode(dto);
  }


  @Post('forgot-password')
  @ApiOperation({
    summary: 'Enviar enlace de recuperación',
  })
  @ApiBody({
    type: ForgotPasswordDto,
  })
  forgotPassword(
    @Body()
    forgotPasswordDto: ForgotPasswordDto,
  ) {
    return this.authService.forgotPassword(
      forgotPasswordDto,
    );
  }

  @Post('reset-password')
  @ApiOperation({
    summary: 'Restablecer contraseña',
  })
  @ApiBody({
    type: ResetPasswordDto,
  })
  resetPassword(
    @Body()
    resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(
      resetPasswordDto,
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
  })
  @ApiBody({
    type: LoginDto,
  })
  @ApiHeader({
    name: 'user-agent',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Login correcto',
  })
  async login(
    @Request()
    req: ExpressRequest & {
      user: any;
    },
    @Headers('user-agent')
    userAgent?: string,
  ) {
    const ip =
      req.ip ??
      req.socket?.remoteAddress ??
      'unknown';

    return this.authService.login(
      req.user,
      ip,
      userAgent,
    );
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refrescar token',
  })
  refresh(
    @Body()
    dto: RefreshTokenDto,
  ) {
    return this.authService.refreshToken(
      dto.refresh_token,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({
    summary: 'Cerrar sesión',
  })
  logout(
    @Request()
    req: ExpressRequest & {
      user: any;
    },
  ) {
    return this.authService.logout(
      req.user.userId,
    );
  }
}