import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './auth.constants';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginLogService } from './login-log.service';
import { DatabaseModule } from '../../database/database.module';
import { MailService } from 'src/common/mail/mail.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, UsuariosService, LoginLogService, LocalStrategy, JwtStrategy,MailService],
  controllers: [AuthController],
  exports: [AuthService, LoginLogService,MailService],
})
export class AuthModule {}
