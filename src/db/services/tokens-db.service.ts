import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db, UpdateWriteOpResult } from 'mongodb';
import { PROVIDERS } from '../../common/constants';
import { TokensEntity } from '../../common/entities';

@Injectable()
export class TokensDbService {
  private collection: Collection;

  constructor(@Inject(PROVIDERS.DB) private readonly db: Db) {
    this.collection = this.db.collection('tokens');
  }

  upsert(tokens: TokensEntity): Promise<UpdateWriteOpResult> {
    return this.collection.updateOne({ userId: tokens.userId },
      { $set: tokens }, { upsert: true });
  }

  findByAuthToken(authToken: string): Promise<TokensEntity> {
    return this.collection.findOne({ authToken });
  }
}
