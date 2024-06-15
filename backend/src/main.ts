import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieparser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieparser());
  const config = new DocumentBuilder()
    .setTitle('Hotel Room Booking')
    .setDescription('This is a test project for hotel room booking system')
    .setVersion('1.0')
    .addTag('Hotel Room booking')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });
  await app.listen(8000);
}
bootstrap();
