import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { USERS_SERVICES, AppLoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthStrategy } from './strategies/local.strategy';
import { JwtAuthStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    AppLoggerModule,
    JwtModule.registerAsync({
      useFactory:(configService:ConfigService)=>({
        secret:configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:`${configService.get('JWT_EXPIRATION')}s`,
        }
      }),
      inject:[ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema:Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        JWT_SECRET:Joi.string().required(),
        JWT_EXPIRATION:Joi.number().required(),
        HTTP_PORT:Joi.number().required(),
        ALLOW_ORIGIN:Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name:USERS_SERVICES.NAME,
        useFactory:(configService:ConfigService)=>({
          transport:Transport.RMQ,
          options:{
            urls:[configService.get<string>('RABBITMQ_URI')],
            queue:USERS_SERVICES.QUEUE,
          },
        }),
        inject:[ConfigService]
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy],
})
export class AuthModule {}
