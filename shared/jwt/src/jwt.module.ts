import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configurations, JwtConfig } from '@shared/configs';

@Global()
@Module({
  imports: [
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
  exports: [
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
})
export class JwtGlobalModule {}
