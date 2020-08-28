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
  @MaxLength(30) // todo check uuid length
  readonly image?: string = 'default.png';
}
