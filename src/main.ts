import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  ConfigModule.forRoot({
    ignoreEnvFile: true,
  });

  // default postman support
  const config = new DocumentBuilder()
    .setTitle('Bitbyte Technology Assesment')
    .setDescription('Bitbyte Technology assesment API description')
    .setVersion('1.0')
    .addTag('Bitbyte Technology Assesment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8800, () => {
    console.log(
      'Bitbyte Technology asesment server is running on port :--',
      8800,
    );
  });
}
bootstrap();
