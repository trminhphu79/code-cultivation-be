import { Global, Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { DatabaseConfigFeature } from '@shared/database';
import { MailerModule } from '@shared/mailer';

@Global()
@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [DatabaseConfigFeature, MailerModule],
  exports: [AccountService],
})
export class AccountModule {}
