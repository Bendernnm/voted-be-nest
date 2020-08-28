import { Module } from '@nestjs/common';
import { SecurityService } from './services/security.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: 'hard!to-guess_secret' })],
  providers: [
    SecurityService,
  ],
  exports: [JwtModule, SecurityService],
})
export class SharedModule {
}
