import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseConfigFeature } from '@shared/database';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configurations, JwtConfig } from '@shared/configs';
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    HttpModule,
    DatabaseConfigFeature,
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
export class AuthModule {}
