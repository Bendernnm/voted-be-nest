import * as uuid from 'uuid';
import { ObjectId } from 'mongodb';
import { TokensDbService } from '../../db/services/tokens-db.service';
import { JwtService } from '@nestjs/jwt';
import { TokensEntity } from '../../common/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokensService {
  constructor(private readonly tokensDbService: TokensDbService,
              private readonly jwtService: JwtService) {
  }

  async generateTokens(userId: ObjectId): Promise<TokensEntity> {
    console.log('!!!');

    const authToken: string = await this.jwtService.signAsync({ userId });
    const refreshToken: string = uuid.v4();

    const tokens: TokensEntity = {
      userId,
      authToken,
      refreshToken,
    };

    await this.tokensDbService.create(tokens);

    return tokens;
  }
}
