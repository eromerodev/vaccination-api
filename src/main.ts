import helmet from 'helmet';
import { env } from '@config/env';
import { json, urlencoded } from 'express';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = env.port;
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      origin: true,
      preflightContinue: false,
    },
  });

  app.use(helmet());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Vaccination API')
    .setDescription('Sample REST API service to coordinate vaccination records')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JwtAuth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  Logger.log(`App running in port ${PORT}`, 'bootstrap');
}
bootstrap();
