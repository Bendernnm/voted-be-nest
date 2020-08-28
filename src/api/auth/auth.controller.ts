import { AuthService } from './auth.service';
import { Controller, Get } from '@nestjs/common';
import { TokensEntity } from './entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Get()
  async login(): Promise<TokensEntity> {
    return {
      authToken: 'authToken',
      refreshToken: 'refreshToken',
    };
  }
}
