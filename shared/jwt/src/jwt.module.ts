import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configurations } from '@shared/configs';

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
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecretKey'),
        privateKey: configService.get<string>('jwtPrivateKey'),
        signOptions: {
          algorithm: 'HS256',
        },
      }),
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
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecretKey'),
        privateKey: configService.get<string>('jwtPrivateKey'),
        signOptions: {
          algorithm: 'HS256',
        },
      }),
    }),
  ],
})
export class JwtGlobalModule {}
