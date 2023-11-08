import {
  AuthLoginDto,
  GetUserDto,
  USERS_SERVICES,
  USER_MSG_PATTERN,
  UsersDocument,
} from '@app/common';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICES.NAME)
    private readonly userClient: ClientProxy,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signWithJwt(user: Omit<UsersDocument, 'password'>, response: Response) {
    const tokenPayload: ITokenPayload = {
      userId: user._id.toString('hex'),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + Number(this.configService.get('JWT_EXPIRATION')),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: expires,
    });
  }

  async validateCredentialAndGetUser(
    authLoginDto: AuthLoginDto,
  ): Promise<Omit<UsersDocument, 'password'>> {
    try {
      const {success,user,error} = await firstValueFrom(
        this.userClient.send(USER_MSG_PATTERN.VERIFY, authLoginDto),
      );

      if (success){
        return user;
      }else {
        throw new UnauthorizedException(error);
      }
    } catch (err) {
      throw err;
    }
  }

  async getUser(getUserDto: GetUserDto) {
    return this.userClient.send(USER_MSG_PATTERN.GET_BY_ID, getUserDto);
  }
}
