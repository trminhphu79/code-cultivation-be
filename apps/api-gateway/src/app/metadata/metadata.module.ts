import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottleGuard } from '@shared/guard';

@Module({
  controllers: [MetadataController],
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
export class MetadataModule {}
