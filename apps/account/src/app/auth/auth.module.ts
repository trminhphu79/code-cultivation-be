import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseConfigFeature } from '@shared/database';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [DatabaseConfigFeature, HttpModule],
})
export class AuthModule {}
