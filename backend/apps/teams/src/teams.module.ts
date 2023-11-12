import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { AppLoggerModule, DatabaseModule } from '@app/common';
import { TeamsDocument, TeamsSchema } from '@app/common/models/teams.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    AppLoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {name:TeamsDocument.name,schema:TeamsSchema}
    ]),
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema:Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
        HTTP_PORT:Joi.number().required(),
        ALLOW_ORIGIN:Joi.string().required(),
      }),
    })
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
