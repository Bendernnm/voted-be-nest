import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { TokensEntity, UserEntity } from '../../common/entities';
import { CreateUserDto } from '../../common/dto';
import { TokensService } from './tokens.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly tokensService: TokensService) {
  }

  @Post('register')
  async login(@Body() createUserDto: CreateUserDto): Promise<TokensEntity> {
    const user: UserEntity = await this.userService.register(createUserDto);

    return this.tokensService.generateTokens(user._id);
  }
}
