import { Controller, Get, Param } from '@nestjs/common';
import { CacheManagerService } from '@shared/cache-manager';
import { Public } from '@shared/guard';

@Controller('cache-health')
export class CacheHealthController {
  constructor(private cache: CacheManagerService) {}

  @Get('check')
  @Public()
  getCache(@Param('key') key: string) {
    return this.cache.get(key);
  }
}
