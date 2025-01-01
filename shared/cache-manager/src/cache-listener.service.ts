import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CacheMessageAction } from './cache-message';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class CacheListener {
  private readonly logger = new Logger(CacheListener.name);

  constructor(@InjectRedis() private redis: Redis) {}

  @OnEvent(CacheMessageAction.Create)
  async handleCreateEvent(data: { key: string; value: any; ttl: number }) {
    await this.redis.set(
      data.key,
      typeof data.value == 'object' ? JSON.stringify(data.value) : data.value
    );
    await this.redis.expire(data.key, data?.ttl || 120); // 60 giây
    this.logger.log(`Handled create cache for key: ${data.key}`);
    const redisData = await this.redis.get(data.key);
    console.dir(JSON.parse(redisData as string));
  }

  @OnEvent(CacheMessageAction.Update)
  async handleUpdateEvent(data: { key: string; value: any }) {
    await this.redis.set(data.key, data.value);
    this.logger.log(`Handled update cache for key: ${data.key}`);
  }

  @OnEvent(CacheMessageAction.Delete)
  async handleDeleteEvent(key: string) {
    await this.redis.del(key);
    this.logger.log(`Handled delete cache for key: ${key}`);
  }
}
