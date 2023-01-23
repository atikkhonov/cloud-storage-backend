/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cloud storage')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, config),
    {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
  );

  await app.listen(5555);
}
bootstrap();
