import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db, InsertOneWriteOpResult, WithId } from 'mongodb';
import { PROVIDERS } from '../../common/constants';
import { TokensEntity } from '../../common/entities';

@Injectable()
export class TokensDbService {
  private collection: Collection;

  constructor(@Inject(PROVIDERS.DB) private readonly db: Db) {
    this.collection = this.db.collection('tokens');
  }

  async create(tokens: TokensEntity): Promise<WithId<TokensEntity>> {
    const insertResult: InsertOneWriteOpResult<WithId<TokensEntity>> = await this.collection.insertOne(tokens);

    return insertResult.ops[0];
  }
}
