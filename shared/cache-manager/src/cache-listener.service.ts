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
    if (!data.key || !data.value) {
      this.logger.warn(`Invalid cache data provided: key or value is missing`);
      return;
    }

    try {
      const valueToStore = JSON.stringify(data.value);
      const ttlInSeconds = +data?.ttl || 120; // Default TTL is 120 seconds if not provided

      await this.redis.set(data.key, valueToStore);
      await this.redis.expire(data.key, ttlInSeconds);

      this.logger.log(
        `Successfully cached key: ${data.key} with TTL: ${ttlInSeconds} seconds`
      );
      console.log(`Cached key: ${data.key}, value: ${valueToStore}`);
    } catch (error: any) {
      this.logger.error(
        `Failed to handle cache creation for key: ${data.key}`,
        error?.stack
      );
      throw new Error(`Cache creation failed: ${error?.message}`);
    }
  }

  @OnEvent(CacheMessageAction.Update)
  async handleUpdateEvent(data: { key: string; value: any }) {
    await this.redis.set(data.key, data.value);
    this.logger.log(`Handled update cache for key: ${data.key}`);
  }

  @OnEvent(CacheMessageAction.Delete)
  async handleDeleteEvent(key: string) {
    console.log('handleDeleteEvent: ', key);
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
