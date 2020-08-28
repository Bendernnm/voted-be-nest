import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(30)
  @IsString()
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(30)
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  readonly password: string;

  @IsString()
  @MinLength(36)
  @MaxLength(36)
  readonly image?: string = 'default.png';
}
