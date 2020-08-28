import { Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { PROVIDERS } from '../common/constants';
import { SecurityService } from './services/security.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: 'hard!to-guess_secret' })],
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
  exports: [JwtModule, SecurityService, PROVIDERS.DB],
})
export class SharedModule {
}
