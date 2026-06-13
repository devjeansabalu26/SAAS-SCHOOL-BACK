import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AuthenticationLoggingInterceptor } from './common/interceptors/authentication-logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new AuthenticationLoggingInterceptor(),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('SaaS Colegio API')
    .setDescription('API de gestión de colegio - Sistema SaaS')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT obtenido en /auth/login. Ejemplo: Bearer eyJhbGci...',
      },
      'Bearer',
    )
    .addTag('Auth', 'Autenticación y autorización')
    .addTag('Usuarios', 'Gestión de usuarios')
    .addTag('Alumnos', 'Gestión de alumnos')
    .addTag('Colegios', 'Gestión de colegios')
    .addTag('Health', 'Verificación de estado del servidor')
    .setContact(
      'Soporte SaaS Colegio',
      'https://saascolegio.com',
      'soporte@saascolegio.com',
    )
    .setLicense(
      'Proprietary',
      'https://saascolegio.com/license',
    )
    .addServer(
      `http://localhost:${process.env.PORT || 3000}`,
      'Servidor local',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      displayRequestDuration: true,
      filter: true,
    },
    customCss: `
      .topbar { display: none; }
      .swagger-ui .auth-wrapper { padding: 20px; background: #f5f5f5; }
    `,
  };
  
  SwaggerModule.setup('api/docs', app, document, swaggerOptions);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  logger.log(`✅ Servidor ejecutándose en: http://localhost:${port}`);
  logger.log(`📚 Documentación Swagger: http://localhost:${port}/api/docs`);
  logger.log(`🔐 JWT Secret configurado: ${!!process.env.JWT_SECRET}`);
}
bootstrap();
