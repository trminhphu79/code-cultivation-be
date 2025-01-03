import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  controllers: [AuthController],
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 100,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AuthModule {}
