import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModuleAsyncOptions } from '@nestjs/sequelize';
import { Configurations, DatabaseConfig } from '../configs';
import { Logger } from '@nestjs/common';

export const sequelizeModuleOptions: SequelizeModuleAsyncOptions = {
  imports: [
    ConfigModule.forRoot({
      load: [Configurations],
    }),
  ],
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    Logger.log('Load configService: ', configService);
    const configs = configService.get<DatabaseConfig>('database');
    Logger.log('Load db config: ', configs);
    return {
      host: configs?.host,
      port: configs?.port,
      dialect: configs?.dialect,
      username: configs?.username,
      password: configs?.password,
      database: configs?.database,
      autoLoadModels: true,
      synchronize: true,
    };
  },
};
