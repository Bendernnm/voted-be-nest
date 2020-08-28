import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { PROVIDERS } from '../../common/constants';

@Injectable()
export class AuthService {
  constructor(@Inject(PROVIDERS.DB) private db: Db) {
  }
}
