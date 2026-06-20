import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';

import { MailService } from 'src/common/mail/mail.service';
import { AuthService } from './services/auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { jwtConstants } from './auth.constants';
import { UsuariosService } from 'src/modules/usuarios/usuarios.service';
import { LoginLogService } from './login-log.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

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
