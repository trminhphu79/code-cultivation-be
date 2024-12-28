import { Module } from '@nestjs/common';
import { AuthModule } from './account/auth/auth.module';
import { ProfileModule } from './account/profile/profile.module';
import { NatsClientModule } from '@shared/nats-client';
import { Configurations } from '@shared/configs';
import { ConfigModule } from '@nestjs/config';
import { JwtGlobalModule } from '@shared/jwt';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@shared/guard';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    JwtGlobalModule,
    NatsClientModule,
    ConfigModule.forRoot({
      load: [Configurations],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
