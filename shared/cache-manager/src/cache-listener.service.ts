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

  @OnEvent(CacheMessageAction.ArrayAdd)
  async handleArrayAdd(data: { key: string; item: any; ttl?: number }) {
    try {
      const currentValue = await this.redis.get(data.key);
      const currentArray = currentValue ? JSON.parse(currentValue) : [];

      currentArray.push(data.item);
      await this.redis.set(data.key, JSON.stringify(currentArray));

      if (data.ttl) {
        await this.redis.expire(data.key, data.ttl);
      }

      this.logger.log(`Successfully added item to array: ${data.key}`);
    } catch (error: any) {
      this.logger.error(
        `Failed to add item to array for key: ${data.key}`,
        error?.stack
      );
      throw error;
    }
  }

  @OnEvent(CacheMessageAction.ArrayRemove)
  async handleArrayRemove(data: { key: string; predicate: string }) {
    try {
      const currentValue = await this.redis.get(data.key);
      if (!currentValue) return;

      const currentArray = JSON.parse(currentValue);
      // Convert predicate string to function
      const predicateFn = new Function('item', `return ${data.predicate}`);

      const filteredArray = currentArray.filter(
        (item: any) => !predicateFn(item)
      );
      await this.redis.set(data.key, JSON.stringify(filteredArray));

      this.logger.log(`Successfully removed items from array: ${data.key}`);
    } catch (error: any) {
      this.logger.error(
        `Failed to remove items from array for key: ${data.key}`,
        error?.stack
      );
      throw error;
    }
  }

  @OnEvent(CacheMessageAction.ArrayUpdate)
  async handleArrayUpdate(data: {
    key: string;
    predicate: string;
    updateFn: string;
  }) {
    try {
      const currentValue = await this.redis.get(data.key);
      if (!currentValue) return;

      const currentArray = JSON.parse(currentValue);
      // Convert predicate and update function strings to functions
      const predicateFn = new Function('item', `return ${data.predicate}`);
      const updateFn = new Function('item', `return ${data.updateFn}`);

      const updatedArray = currentArray.map((item: any) =>
        predicateFn(item) ? updateFn(item) : item
      );

      await this.redis.set(data.key, JSON.stringify(updatedArray));

      this.logger.log(`Successfully updated items in array: ${data.key}`);
    } catch (error: any) {
      this.logger.error(
        `Failed to update items in array for key: ${data.key}`,
        error?.stack
      );
      throw error;
    }
  }
}
