import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../common/constants';
import { Collection, Db, InsertOneWriteOpResult } from 'mongodb';
import { CreateUserDto } from '../../common/dto';
import { UserEntity } from '../../common/entities';

@Injectable()
export class UserDbService {
  private collection: Collection;

  constructor(@Inject(PROVIDERS.DB) private readonly db: Db) {
    this.collection = this.db.collection('users');
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.collection.findOne({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const insertResult: InsertOneWriteOpResult<UserEntity> = await this.collection.insertOne(createUserDto);

    return insertResult.ops[0];
  }
}
