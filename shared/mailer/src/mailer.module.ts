import { Module, Global } from '@nestjs/common';
import { EmailService } from './mailer.service';
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
  providers: [EmailService],
  exports: [EmailService],
})
export class MailerModule {}
