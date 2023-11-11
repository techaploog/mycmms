import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { AUTH_SERVICES } from '@app/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport:Transport.RMQ,
    options:{
      urls:[configService.get('RABBITMQ_URI')],
      queue: AUTH_SERVICES.QUEUE
    }
  })

  console.log(configService.get('ALLOW_ORIGIN'))

  app.use(helmet());
  app.enableCors({
    origin:configService.get('ALLOW_ORIGIN').split(',')
  })
  app.use(cookieParser());
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
