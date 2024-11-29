import { NestFactory } from '@nestjs/core';
import { ExamModule } from './exam.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ExamModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.startAllMicroservices();
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  });

  await app.listen(3002);
}
bootstrap();
