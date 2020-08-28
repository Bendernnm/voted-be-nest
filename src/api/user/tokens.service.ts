import * as uuid from 'uuid';
import { DeleteWriteOpResultObject, ObjectId } from 'mongodb';
import { TokensDbService } from '../../db/services/tokens-db.service';
import { JwtService } from '@nestjs/jwt';
import { TokensEntity } from '../../common/entities';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class TokensService {
  constructor(private readonly tokensDbService: TokensDbService,
              private readonly jwtService: JwtService) {
  }

  async generateTokens(userId: ObjectId): Promise<TokensEntity> {
    const authToken: string = await this.jwtService.signAsync({ userId });
    const refreshToken: string = uuid.v4();

    const tokens: TokensEntity = {
      userId,
      authToken,
      refreshToken,
    };

    await this.tokensDbService.upsert(tokens);

    return tokens;
  }

  removeTokens(authToken: string): Promise<DeleteWriteOpResultObject> {
    return this.tokensDbService.delete(authToken);
  }

  async auth(authToken: string): Promise<ObjectId> {
    const tokens = await this.tokensDbService.findByAuthToken(authToken);

    if (!tokens) {
      throw new HttpException('Unauthorized', 401);
    }

    return tokens.userId;
  }
}
