import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './auth.constants';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginLogService } from './login-log.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, UsuariosService, LoginLogService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, LoginLogService],
})
export class AuthModule {}
