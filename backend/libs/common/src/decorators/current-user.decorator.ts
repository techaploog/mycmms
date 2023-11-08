import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UsersDocument } from "../models/users.schema";

const getCurrentUserByContext = (context: ExecutionContext): UsersDocument => {
  return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
  (_data:unknown, context:ExecutionContext) => getCurrentUserByContext(context)
)