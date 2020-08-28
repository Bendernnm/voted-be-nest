import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from '../../shared/shared.module';
import { DBModule } from '../../db/db.module';

@Module({
  imports: [SharedModule, DBModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
}
