import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { AccessControlService, RoleGuard } from '@shared/guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [MetadataController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    AccessControlService
  ],
})
export class MetadataModule {}
