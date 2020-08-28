import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(25)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(20)
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MinLength(32)
  readonly password: string;

  @IsString()
  @MaxLength(30) // todo check uuid length
  readonly image?: string = 'default.png';
}