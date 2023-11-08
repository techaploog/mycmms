import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({versionKey:false})
export class UsersDocument extends AbstractDocument{
  @Prop()
  email:string;

  @Prop()
  password:string;

  @Prop()
  roles?:string[];
}

export const UsersSchema = SchemaFactory.createForClass(UsersDocument);