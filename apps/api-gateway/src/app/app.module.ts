import { Module } from '@nestjs/common';
import { AuthModule } from './account/auth/auth.module';
import { ProfileModule } from './account/profile/profile.module';
import { NatsClientModule } from '@shared/nats-client';
import { Configurations, JwtConfig } from '@shared/configs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@shared/guard';
import { CacheHealthModule } from './cache-health/cache-health.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          load: [Configurations],
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<JwtConfig>('jwt');
        console.log('JwtConfig: ', config);
        return {
          secret: config?.secret,
          privateKey: config?.privateKey,
          signOptions: {
            algorithm: config?.algorithm,
          },
        } as JwtModuleOptions;
      },
    }),
    NatsClientModule,
    CacheHealthModule,
    ConfigModule.forRoot({
      load: [Configurations],
      isGlobal: true,
    }),
    CacheHealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
