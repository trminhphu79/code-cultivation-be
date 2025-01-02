import { Module, Global } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigModule } from '@nestjs/config';
import { Configurations } from '@shared/configs';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configurations],
      isGlobal: true,
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
