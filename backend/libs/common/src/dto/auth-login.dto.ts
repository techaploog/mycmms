import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email:string;

  @IsStrongPassword()
  @IsNotEmpty()
  password:string;

}