import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);

  app.use(helmet());
  app.useLogger(app.get(Logger));

  app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
