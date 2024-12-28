import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeModuleOptions } from './database.config';
import { Module } from '@nestjs/common';
import { DatabaseModels } from './database.models';

export const DatabaseConfigFeature = Object.freeze(
  SequelizeModule.forFeature(DatabaseModels)
);

@Module({
  imports: [SequelizeModule.forRootAsync(sequelizeModuleOptions)],
  exports: [SequelizeModule.forRootAsync(sequelizeModuleOptions)],
})
export class DatabaseConfigModule {}
