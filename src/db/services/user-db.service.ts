import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../common/constants';
import { Collection, Db } from 'mongodb';

@Injectable()
export class UserDbService {
  private collection: Collection;

  constructor(@Inject(PROVIDERS.DB) private readonly db: Db) {
    this.collection = this.db.collection('users');
  }

  create() {
    return this.collection.insertOne({ a: 2 });
  }
}
