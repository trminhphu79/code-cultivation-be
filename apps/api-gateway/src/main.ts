/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('TangKinhCode API')
    .setDescription('The TangKinhCode API description')
    .setVersion('1.0')
    .addTag('TangKinhCode')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, documentFactory);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
