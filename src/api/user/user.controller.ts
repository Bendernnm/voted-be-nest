import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { TokensEntity } from '../../common/entities';
import { CreateUserDto } from '../../common/dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('register')
  async login(@Body() createUserDto: CreateUserDto): Promise<TokensEntity> {
    await this.userService.register(createUserDto);

    return {
      authToken: 'authToken',
      refreshToken: 'refreshToken',
    };
  }
}
