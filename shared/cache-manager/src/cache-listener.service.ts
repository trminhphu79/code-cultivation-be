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
    await this.redis.set(data.key, typeof JSON.stringify(data.value));
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

  @OnEvent(CacheMessageAction.PartialUpdate)
  async handlePartialUpdate(input: { key: string; newValue: any }) {
    const stringData = await this.redis.get(input.key);
    if (!stringData) return;
    const currentData = JSON.parse(stringData);
    if (typeof currentData == 'object') {
      await this.redis.set(input.key, {
        ...currentData,
        ...input.newValue,
      });
    } else {
      await this.redis.set(input.key, input.newValue);
    }
    this.logger.log(`Handled update cache for key: ${input.key}`);
  }
}
