import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< Updated upstream
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
=======
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
>>>>>>> Stashed changes

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Learning Nest')
    .setDescription('The Learning Nest API description')
    .setVersion('1.0')
    .addTag('learning-nest')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

<<<<<<< Updated upstream
  await app.listen(process.env.PORT || 8081);
=======
  const configService = app.get(ConfigService);
  const port = configService.get<number>('database.port');

  await app.listen(port);
>>>>>>> Stashed changes
}
bootstrap();
