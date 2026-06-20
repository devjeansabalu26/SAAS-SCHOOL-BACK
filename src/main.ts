import { NestFactory } from '@nestjs/core';
import {
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AuthenticationLoggingInterceptor } from './common/interceptors/authentication-logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  const configService = app.get(ConfigService);

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );


  app.setGlobalPrefix('api', {
    exclude: [
      'auth/(.*)',
    ],
  });

  app.enableCors({
    origin: [
      configService.get<string>('FRONTEND_URL') ||
        'http://localhost:4200',
    ],
    credentials: true,
    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
    }),
  );

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new LoggingInterceptor(),
    new AuthenticationLoggingInterceptor(),
  );

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SaaS School API')
    .setDescription(
      'API Multi-Tenant para gestión escolar',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'Bearer',
    )
    .addTag('Auth')
    .addTag('Usuarios')
    .addTag('Alumnos')
    .addTag('Colegios')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'SaaS School API',
    customCss: `
      .topbar{
        display:none;
      }
    `,
  };

  SwaggerModule.setup(
    'api/docs',
    app,
    document,
    swaggerOptions,
  );

  const port =
    configService.get<number>('PORT') || 3000;

  await app.listen(port);

  logger.log(
    `🚀 API ejecutándose en http://localhost:${port}/api`,
  );

  logger.log(
    `📚 Swagger: http://localhost:${port}/api/docs`,
  );
}

bootstrap();