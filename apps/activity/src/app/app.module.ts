import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { NatsClientModule } from '@shared/nats-client';
import { CacheManagerModule } from '@shared/cache-manager';
import { GlobalEventEmitterModule } from '@shared/event-emitter';

@Module({
  imports: [
    ProfileModule,
    NatsClientModule,
    CacheManagerModule,
    GlobalEventEmitterModule,
  ],
})
export class AppModule {}
