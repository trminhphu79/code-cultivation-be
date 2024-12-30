import { Global, Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { DatabaseConfigFeature } from '@shared/database';
@Global()
@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [DatabaseConfigFeature],
  exports: [AccountService],
})
export class AccountModule {}
