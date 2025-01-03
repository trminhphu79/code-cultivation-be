import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottleGuard } from '@shared/guard';
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
      useClass: CustomThrottleGuard,
    },
  ],
})
export class AuthModule {}
