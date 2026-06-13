import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AlumnosModule } from './modules/alumnos/alumnos.module';
import { ColegiosModule } from './modules/colegios/colegios.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: Number(config.get('DB_PORT', 5432)),
        username: config.get('DB_USER', 'postgres'),
        password: config.get('DB_PASS', 'postgres'),
        database: config.get('DB_NAME', 'saas_colegio'),
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
      }),
    }),
    DatabaseModule,
    AuthModule,
    UsuariosModule,
    AlumnosModule,
    ColegiosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
