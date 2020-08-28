import { Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { PROVIDERS } from '../common/constants';
import { SecurityService } from './services/security.service';

@Module({
  imports: [],
  providers: [
    SecurityService,
    {
      provide: PROVIDERS.DB,
      useFactory: async (): Promise<Db> => {
        const client = await MongoClient.connect('mongodb://127.0.0.1', {
          useUnifiedTopology: true,
        });

        return client.db('mydb');
      },
    },
  ],
  exports: [SecurityService, PROVIDERS.DB],
})
export class SharedModule {
}
