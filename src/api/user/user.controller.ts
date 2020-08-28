import { UserService } from './user.service';
import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { TokensEntity, UserEntity } from '../../common/entities';
import { RegisterUserDto, SignInUserDto } from '../../common/dto';
import { TokensService } from './tokens.service';
import { MessageEntity } from '../../common/entities/message.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly tokensService: TokensService) {
  }

  @HttpCode(201)
  @Post('register')
  async register(@Body() createUserDto: RegisterUserDto): Promise<TokensEntity> {
    const user: UserEntity = await this.userService.register(createUserDto);

    return this.tokensService.generateTokens(user._id);
  }

  @Post('sign-in')
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<TokensEntity> {
    const user: UserEntity = await this.userService.findByEmailAndPassword(signInUserDto.email, signInUserDto.password);

    return this.tokensService.generateTokens(user._id);
  }

  @Post('sign-out')
  async signOut(@Headers('Authorization') authToken: string): Promise<MessageEntity> {
    await this.tokensService.removeTokens(authToken);

    return { message: 'sign out' };
  }
}
