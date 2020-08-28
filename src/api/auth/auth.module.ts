import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '../../shared/shared.module';
import { DBModule } from '../../db/db.module';

@Module({
  imports: [SharedModule, DBModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
}
