import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottleGuard } from '@shared/guard';
import { DatabaseConfigFeature, DatabaseConfigModule } from '@shared/database';
import { MetadataService } from './metadata.service';
import { FileUploaderModule } from '@shared/file-uploader';

@Module({
  controllers: [MetadataController],
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 100,
      },
    ]),
    FileUploaderModule.forRoot({
      publicKey: process.env['IMAGE_KIT_PUBLIC_KEY'],
      urlEndpoint: process.env['IMAGE_KIT_ENDPOINT'],
      privateKey: process.env['IMAGE_KIT_PRIVATE_KEY'],
    }),
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
