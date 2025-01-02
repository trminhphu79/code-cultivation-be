import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CacheMessageAction } from '@shared/cache-manager';
import {
  ChangePasswordDto,
  DeactivateDto,
  CreateProfileDto,
  VerifyEmailOtp,
  ResendVerifyEmail,
} from '@shared/dtos/account';
import { throwException } from '@shared/exception';
import { EmailService } from '@shared/mailer';
import { Profile } from '@shared/models/profile';
import { catchError, from, map, of, tap } from 'rxjs';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);
  constructor(
    @InjectModel(Profile)
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
    private readonly profileModel: typeof Profile,
    private readonly mailerService: EmailService,
    private readonly configService: ConfigService
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
    try {
      // Generate a JWT token for email verification
      const token = this.jwtService.sign(
        { email: body.email, time: new Date().getTime() },
        {
          expiresIn: '2m', // Set token expiration
        }
      );

      const verificationLink = `http://localhost:4200/auth/verify-email?token=${token}`;

      this.logger.log('Generated verification token: ', token);
      return this.mailerService
        .sendOtpVerifyEmail(body.email, verificationLink)
        .pipe(
          tap(() => {
            this.logger.log(`Verification email sent to ${body.email}`);
            this.eventEmitter.emit(CacheMessageAction.Create, {
              key: `VERIFY_EMAIL#${body.email}`,
              value: token,
            });
          }),
          map(() => ({
            data: null,
            message: `Đường dẫn xác thực tài khoản đã được gửi đến email: ${body.email}. Vui lòng kiểm tra hộp thư để hoàn tất quá trình xác thực tài khoản.`,
          })),
          catchError((error) => {
            this.logger.error(
              'Error sending verification email: ',
              error.message
            );
            return throwException(
              HttpStatus.INTERNAL_SERVER_ERROR,
              'Không thể gửi email xác thực. Vui lòng thử lại sau!'
            );
          })
        );
    } catch (error) {
      this.logger.error('Unexpected error: ', error.message);
      return throwException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Đã xảy ra lỗi. Vui lòng thử lại sau!'
      );
    }
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
