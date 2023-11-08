import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { ITokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy,'jwt'){
  constructor(
    private readonly configService:ConfigService,
    private readonly authService:AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request:any) => request?.cookies?.Authentication || request?.Authentication
      ]),
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  async validate({userId}:ITokenPayload) {
    return this.authService.getUser({_id:userId});
  }
}