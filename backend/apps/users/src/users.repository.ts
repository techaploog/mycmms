import { AbstractRepository, UsersDocument } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument>{
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UsersDocument.name)
    usersModel:Model<UsersDocument>,
  ){
    super(usersModel);
  }

}