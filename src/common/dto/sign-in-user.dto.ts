import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsString()
  @IsEmail()
  @MaxLength(30)
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  readonly password: string;
}
