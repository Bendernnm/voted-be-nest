import { Injectable } from '@nestjs/common';
import { UserDbService } from '../../db/services/user-db.service';

@Injectable()
export class AuthService {
  constructor(private readonly userDbService: UserDbService) {
  }
}
