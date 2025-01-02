import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  ChangePasswordDto,
  DeactivateDto,
  CreateProfileDto,
  VerifyEmailOtp,
  ResendVerifyEmail,
} from '@shared/dtos/account';
import { MailerService } from '@shared/mailer';
import { Profile } from '@shared/models/profile';
import { from, of, tap } from 'rxjs';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);
  constructor(
    @InjectModel(Profile)
    private readonly profileModel: typeof Profile,
    private readonly mailerService: MailerService
  ) {}

  handleChangePassword(body: ChangePasswordDto) {
    return of({ message: 'Not impelemnted!!' });
  }

  handleDeactivate(body: DeactivateDto) {
    return of({ message: 'Not impelemnted!!' });
  }

  handleVerifyEmail(body: VerifyEmailOtp) {
    return of({ message: 'Not impelemnted!!' });
  }

  handleSendVerifyEmail(body: ResendVerifyEmail) {
    // return of({ message: 'Not impelemnted!!' }).pipe(
    //   tap(() => {
    //     this.mailerService.sendMail({
    //       to: 'trminhphu79@gmail.com', // list of receivers
    //       from: 'noreply@tangkinhcode.com', // sender address
    //       subject: 'Testing Nest MailerModule ✔', // Subject line
    //       text: 'Hello bro :))', // plaintext body
    //       html: '<b>Hello bro :))</b>', // HTML body content
    //     });
    //   })
    // );

    console.log('mailerService instance');
    return this.mailerService.sendMail(
      'trminhphu79@gmail.com',
      'Hello',
      'Hello',
      '<h1>Hello bro</h1>'
    );
  }

  handleCreateProfile(body: CreateProfileDto, accountId: string) {
    return from(
      this.profileModel.create({
        ...body,
        accountId,
      })
    );
  }
}
