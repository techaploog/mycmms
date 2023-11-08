import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AppLoggerModule, DatabaseModule, UsersDocument, UsersSchema } from '@app/common';
import { UsersRepository } from './users.repository';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    AppLoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {name:UsersDocument.name,schema:UsersSchema}
    ]),
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema:Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
        HTTP_PORT:Joi.number().required(),
      }),
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
