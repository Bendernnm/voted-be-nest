import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../common/constants';
import { Collection, Db, InsertOneWriteOpResult } from 'mongodb';
import { RegisterUserDto } from '../../common/dto';
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

  async create(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const insertResult: InsertOneWriteOpResult<UserEntity> = await this.collection.insertOne(registerUserDto);

    return insertResult.ops[0];
  }
}
