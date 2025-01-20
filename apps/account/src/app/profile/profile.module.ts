import { Global, Module } from '@nestjs/common';
import { DatabaseConfigFeature } from '@shared/database';
import { MailerModule } from '@shared/mailer';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configurations, JwtConfig } from '@shared/configs';
import { QueryBuilderModule } from '@shared/query-builder';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
@Global()
@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    DatabaseConfigFeature,
    MailerModule,
    QueryBuilderModule,
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
  exports: [ProfileService],
})
export class ProfileModule {}
