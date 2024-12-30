import { Global, Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
@Global()
@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
