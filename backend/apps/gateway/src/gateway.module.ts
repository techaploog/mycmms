import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AUTH_SERVICES, AppLoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule,Transport} from '@nestjs/microservices';

@Module({
  imports: [
    AppLoggerModule,
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema:Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name:AUTH_SERVICES,
        useFactory:(configService:ConfigService)=>({
          transport:Transport.RMQ,
          options:{
            urls:[configService.get<string>('RABBITMQ_URI')],
            queue:AUTH_SERVICES,
          }
        }),
        inject:[ConfigService]
      }
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
