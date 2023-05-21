import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ivi clone API Gateway documentation.')
    .setDescription('Includes all reachable from client requests.')
    .setVersion('0.1.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  app.enableCors();

  await app.listen(process.env.APP_PORT, () => {
    console.log(
      `API Gateway started on ${process.env.APP_PORT} at ${new Date()}.`,
    );
    console.log('Application variables:');
    console.log('RabbitMQ address: ', process.env.RMQ_URL);
  });
}

bootstrap();
