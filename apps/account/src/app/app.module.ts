import { DatabaseConfigModule } from '@shared/database';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { Configurations } from '@shared/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configurations],
      isGlobal: true,
    }),
    DatabaseConfigModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
