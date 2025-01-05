import { Global, Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { DatabaseConfigFeature } from '@shared/database';
import { MailerModule } from '@shared/mailer';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configurations, JwtConfig } from '@shared/configs';
@Global()
@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [
    DatabaseConfigFeature,
    MailerModule,
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
  ],
  exports: [AccountService],
})
export class AccountModule {}
