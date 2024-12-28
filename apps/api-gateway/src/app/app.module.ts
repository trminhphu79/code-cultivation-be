import { Module } from '@nestjs/common';
import { AuthModule } from './account/auth/auth.module';
import { ProfileModule } from './account/profile/profile.module';
import { NatsClientModule } from '@shared/nats';
import { Configurations } from '@shared/configs';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    NatsClientModule,
    ConfigModule.forRoot({
      load: [Configurations],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
