import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy,'local'){
  constructor (
    private readonly authServices:AuthService
  ) {
    super({usernameField:'email'});
  }

  async validate(email:string, password:string){
    try{
      return this.authServices.validateCredentialAndGetUser({email,password});
    }catch(err){
      throw new UnauthorizedException(err);
    }
  }

}