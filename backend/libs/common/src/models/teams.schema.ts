import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({versionKey:false})
export class TeamsDocument extends AbstractDocument{
  @Prop()
  name:string;

  @Prop()
  manager:string;

  @Prop()
  leaders?:string[];

  @Prop()
  members?:string[];
}

export const TeamsSchema = SchemaFactory.createForClass(TeamsDocument);