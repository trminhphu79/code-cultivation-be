import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeModuleOptions } from './database.config';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forRootAsync(sequelizeModuleOptions)],
  exports: [SequelizeModule.forRootAsync(sequelizeModuleOptions)],
})
export class DatabaseConfigModule {}
