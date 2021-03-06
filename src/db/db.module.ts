import { Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { PROVIDERS } from '../common/constants';
import { UserDbService } from './services/user-db.service';
import { TokensDbService } from './services/tokens-db.service';

@Module({
  imports: [],
  providers: [
    {
      provide: PROVIDERS.DB,
      useFactory: async (): Promise<Db> => {
        const client = await MongoClient.connect('mongodb://127.0.0.1', {
          useUnifiedTopology: true,
        });

        return client.db('mydb');
      },
    },
    UserDbService,
    TokensDbService,
  ],
  exports: [UserDbService, TokensDbService],
})
export class DBModule {
}
