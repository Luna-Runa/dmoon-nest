import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.PORT;

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats api')
    .setDescription('cats docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });

  app.enableCors({
    origin: process.env.MODE === 'dev' ? true : process.env.CLIENT_URL,
    credentials: true,
  });

  await app.listen(PORT);
}
bootstrap();
