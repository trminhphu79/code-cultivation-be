import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseConfigFeature } from '@shared/database';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [HttpModule, DatabaseConfigFeature],
})
export class AuthModule {}
