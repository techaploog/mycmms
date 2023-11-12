// import { OmitType } from "@nestjs/mapped-types";
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { ApiProperty,OmitType } from "@nestjs/swagger";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email:string;

  @IsStrongPassword()
  @IsNotEmpty()
  password:string;

  @IsString()
  @IsNotEmpty()
  name:string;

  @IsOptional()
  @IsArray()
  @IsString({each:true})
  teams?:string[]

  @IsOptional()
  @IsArray()
  @IsString({each:true})
  @IsNotEmpty({each:true})
  roles?:string[];
}

export class UserDto extends OmitType(CreateUserDto,['password']) {}

export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  _id:string;
}