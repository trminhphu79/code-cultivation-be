import { Module } from '@nestjs/common';
import { RealmModule } from './realm/realm.module';
import { AchievementModule } from './achievement/achievement.module';
import { SectModule } from './sect/sect.module';
import { NatsClientModule } from '@shared/nats-client';
import { CacheManagerModule } from '@shared/cache-manager';
import { MaterialArtModule } from './material-art/material-art.module';

@Module({
  imports: [
    SectModule,
    RealmModule,
    MaterialArtModule,
    NatsClientModule,
    AchievementModule,
    CacheManagerModule
  ],
})
export class AppModule {}
