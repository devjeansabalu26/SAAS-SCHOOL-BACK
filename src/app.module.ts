import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';

import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ColegiosModule } from './modules/colegios/colegios.module';
import { AlumnosModule } from './modules/alumnos/alumnos.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: '.env',
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    TypeOrmModule.forRootAsync({

      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({

        type: 'postgres',

        host: config.get<string>('DB_HOST'),

        port: Number(
          config.get('DB_PORT'),
        ),

        username: config.get<string>('DB_USER'),

        password: config.get<string>('DB_PASS'),

        database: config.get<string>('DB_NAME'),

        autoLoadEntities: true,

        synchronize: false,

        logging:
          config.get('NODE_ENV') !== 'production',

        maxQueryExecutionTime: 1000,
      }),
    }),

    DatabaseModule,

    AuthModule,

    UsuariosModule,

    ColegiosModule,

    AlumnosModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}