import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { from, map, tap } from 'rxjs';

@Injectable()
export class CacheManagerService {
  private readonly logger = new Logger(CacheManagerService.name);
  constructor(@InjectRedis() private readonly cache: Redis) {}

  get<T>(key: string) {
    this.logger.log(`Start Get from cache: ${key}`);
    return from(this.cache.get(key)).pipe(
      map((value) => {
        if (!value) {
          return null;
        }
        return JSON.parse(value as string) || (null as T);
      }),
      tap((response) => {
        if (response) {
          this.logger.log(`Get from cache success: ${key}`);
        }
      })
    );
  }
}
