import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configurations } from '@shared/configs';
import { DatabaseConfigModule } from '@shared/database';
import { AccountModule } from './account/account.module';
import { BcryptModule } from '@shared/bcrypt';
import { GlobalEventEmitterModule } from '@shared/event-emitter';
import { CacheManagerModule } from '@shared/cache-manager';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    BcryptModule,
    AccountModule,
    ConfigModule.forRoot({
      load: [Configurations],
      isGlobal: true,
    }),
    CacheManagerModule,
    DatabaseConfigModule,
    GlobalEventEmitterModule,
  ],
})
export class AppModule {}
