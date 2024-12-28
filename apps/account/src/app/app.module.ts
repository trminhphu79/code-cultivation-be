import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configurations } from '@shared/configs';
import { DatabaseConfigModule } from '@shared/database';
import { AccountModule } from './account/account.module';
import { BcryptModule } from '@shared/bcrypt';
import { JwtGlobalModule } from '@shared/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configurations],
      isGlobal: true,
    }),
    DatabaseConfigModule,
    AccountModule,
    BcryptModule,
    JwtGlobalModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
