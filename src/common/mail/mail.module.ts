
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginLogService } from 'src/modules/auth/login-log.service';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { UsuariosService } from 'src/modules/usuarios/usuarios.service';
import { MailService } from './mail.service';
import { AuthController } from 'src/modules/auth/auth.controller';
import { jwtConstants } from 'src/modules/auth/auth.constants';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiresIn,
      },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsuariosService,
    LoginLogService,
    LocalStrategy,
    JwtStrategy,
    MailService, // <-- REGISTRARLO AQUÍ
  ],
  exports: [
    AuthService,
    LoginLogService,
    MailService,
  ],
})
export class AuthModule {}
