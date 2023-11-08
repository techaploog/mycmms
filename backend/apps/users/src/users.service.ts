import { Injectable, Logger, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthLoginDto, CreateUserDto, GetUserDto } from '@app/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger();
  constructor(
    private readonly usersRepository:UsersRepository
  ) {}

  private async validateCreateUserDto (createUserDto:CreateUserDto){
    try{
      const {email} = createUserDto;
      await this.usersRepository.findOne({email});
    }catch (err){
      return;
    }
    
    throw new UnprocessableEntityException('Email already exists.');
  }

  async create(createUserDto:CreateUserDto){
    try{
      await this.validateCreateUserDto(createUserDto);
      return this.usersRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password,10),
      })
    }catch(err){
      this.logger.error(err.message)
      throw err
    }
  }

  async verify(email:string,passport:string){
    try{
      const user = await this.usersRepository.findOne({email});
      const {password, ...userNoPass} = user;
      const isValid = await bcrypt.compare(passport, user.password);
      if (isValid){
        return userNoPass;
      }
    }catch (err) {
      this.logger.error(err.message);
      if (err.message !== 'Document not found.')
        throw err;
    }
    this.logger.error('Creadentials are not valid.');
    throw new UnauthorizedException('Creadentials are not valid.');
  }

  async getUserInfo(getUserDto:GetUserDto){
    const {_id} = getUserDto;
    return this.usersRepository.findOne({_id});
  }
}
