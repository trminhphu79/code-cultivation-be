import { Global, Module } from '@nestjs/common';
import { CacheListener } from './cache-listener.service';
import { RedisModule } from '@nestjs-modules/ioredis';

@Global()
@Module({
  imports: [
    RedisModule.forRoot({
      url: process.env['REDIS_URL'],
      type: 'single',
    }),
  ],
  providers: [CacheListener],
})
export class CacheManagerModule {}
