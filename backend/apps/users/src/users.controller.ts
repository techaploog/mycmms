import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthLoginDto, CreateUserDto, GetUserDto, USER_MSG_PATTERN } from '@app/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // * For HTTP
  @Post()
  async httpCreate(@Body() createUserDto:CreateUserDto){
    return this.usersService.create(createUserDto);
  }

  @Get()
  async httpTestGet(){
    return {message:'this is test.'}
  }

  @Get(':id')
  async httpGetUser(@Param() param:any){
    const {id} = param;
    return this.usersService.getUserInfo({_id:id});
  }



  // * For microservices
  @MessagePattern(USER_MSG_PATTERN.VERIFY)
  async verifyEmailPass(@Payload() authLoginDto:AuthLoginDto){
    const {email,password} = authLoginDto;
    try{
      const user = await this.usersService.verify(email,password);
      return {success:true,user}
    }catch(err){
      return {success:false,error:err.message}
    }
  }

  @MessagePattern(USER_MSG_PATTERN.GET_BY_ID)
  async getUserById(@Payload() getUserDto:GetUserDto){
    return this.usersService.getUserInfo(getUserDto);
  }
}
