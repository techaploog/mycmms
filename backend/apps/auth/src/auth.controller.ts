import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser, UsersDocument } from '@app/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async test(){
    return {chk:'ok'}
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser()
    user: Omit<UsersDocument, 'password'>,
    @Res({ passthrough: true })
    response: Response,
  ) {
    await this.authService.signWithJwt(user, response);
    response.send(user);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response?.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
    response.send({ success: true });
  }
}
