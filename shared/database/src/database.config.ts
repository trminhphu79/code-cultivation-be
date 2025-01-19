import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModuleAsyncOptions } from '@nestjs/sequelize';
import { Configurations, DatabaseConfig } from '@shared/configs';
import { DatabaseModels } from './database.models';

export const sequelizeModuleOptions: SequelizeModuleAsyncOptions = {
  imports: [
    ConfigModule.forRoot({
      load: [Configurations],
    }),
  ],
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const configs = configService.get<DatabaseConfig>('database');
    return {
      host: configs?.host,
      port: configs?.port,
      dialect: configs?.dialect,
      username: configs?.username,
      password: configs?.password,
      database: configs?.database,
      autoLoadModels: true,
      synchronize: true,
      models: DatabaseModels,
      pool: {
        max: 20,
        min: 2,
        idle: 10000,
        acquire: 30000,
      },
    };
  },
};
