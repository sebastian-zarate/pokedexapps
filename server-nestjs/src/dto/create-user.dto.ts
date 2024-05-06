import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export {} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
}