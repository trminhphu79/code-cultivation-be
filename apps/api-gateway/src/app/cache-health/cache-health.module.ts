import { CacheManagerModule } from '@shared/cache-manager';
import { Module } from '@nestjs/common';
import { CacheHealthController } from './cache-health.controller';

@Module({
  imports: [CacheManagerModule],
  controllers: [CacheHealthController],
})
export class CacheHealthModule {}
