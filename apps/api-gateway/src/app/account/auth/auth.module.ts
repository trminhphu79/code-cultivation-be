import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
  controllers: [AuthController],
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 500,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 10000,
      },
    ]),
  ],
})
export class AuthModule {}
