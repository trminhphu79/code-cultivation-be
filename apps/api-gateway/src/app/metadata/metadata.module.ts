import { Module } from '@nestjs/common';
import { MedataController } from './metadata.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottleGuard } from '@shared/guard';
import { DatabaseConfigFeature, DatabaseConfigModule } from '@shared/database';
import { MetadataService } from './metadata.service';

@Module({
  controllers: [MedataController],
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 100,
      },
    ]),
    DatabaseConfigModule,
    DatabaseConfigFeature,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottleGuard,
    },
    MetadataService,
  ],
})
export class MetadataModule {}
