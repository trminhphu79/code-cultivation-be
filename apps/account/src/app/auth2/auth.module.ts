import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseConfigFeature, DatabaseConfigModule } from '@shared/database';
import { HttpModule } from '@nestjs/axios';
import { BcryptModule } from '@shared/bcrypt';
import { CacheManagerModule } from '@shared/cache-manager';
import { JwtGlobalModule } from '@shared/jwt';
import { GlobalEventEmitterModule } from '@shared/event-emitter';

@Global()
@Module({
  imports: [
    DatabaseConfigFeature,
    HttpModule,
    BcryptModule,
    JwtGlobalModule,
    CacheManagerModule,
    DatabaseConfigModule,
    GlobalEventEmitterModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
