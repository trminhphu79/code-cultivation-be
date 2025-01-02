// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { MailerConfig } from '@shared/configs';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class MailerService {
//   private transporter: nodemailer.Transporter;
//   constructor(private readonly configService: ConfigService) {
//     // Initialize Nodemailer transporter
//     const mailer = configService.get<MailerConfig>('mailer');
//     this.transporter = nodemailer.createTransport({
//       host: mailer?.host || 'smtp.example.com',
//       port: mailer?.port || 587,
//       secure: false, // true for port 465, false for other ports
//       auth: {
//         user: mailer?.user || 'your_email@example.com',
//         pass: mailer?.pass || 'your_password',
//       },
//     });
//     console.log('transporter instance: ', this.transporter);
//   }
//   async sendMail(
//     to: string,
//     subject: string,
//     text: string,
//     html?: string
//   ): Promise<any> {
//     const mailOptions = {
//       from: '"No-Reply" <no-reply@tangkinhcode.com>',
//       to,
//       subject,
//       text,
//       html,
//     };
//     try {
//       const info = await this.transporter.sendMail(mailOptions);
//       console.log('Email sent: ', info.response);
//       return info;
//     } catch (error) {
//       console.error('Error sending email: ', error);
//       throw error;
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport = require('nodemailer/lib/smtp-transport');
import { MailerConfig } from '@shared/configs';
export const VERIFY_SIGN_UP = {
  NAME: 'TangKinhCode',
  SUBJECT_VRF: 'Xác thực tài khoản',
  HTML: '<span>Vui lòng nhấp vào <a href="${token}" style="font-weight:600">xác thực</a> để kích hoạt tài khoản của bạn</span>',
  SUBJECT_RS: 'Xác thực tài khoản',
};

export const RESEND_FORGOT_PASSWORD_TEMPLATE = {
  NAME: 'Univiec',
  SUBJECT: 'Resend OTP',
  HTML: '<span>Your OTP: <strong>${otp}</strong> OTP will expire in <strong>3 minues</strong>. Please do not <strong>share</strong> this OTP with anyone</span>',
  SUBJECT_RS: 'Reset password',
};

export const EMAIL_TEMPLATE = {
  FORGOT_PASSWRD: RESEND_FORGOT_PASSWORD_TEMPLATE,
  VERIFY_SIGN_UP: VERIFY_SIGN_UP,
};
@Injectable()
export class EmailService {
  mailer!: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;

  constructor(configService: ConfigService) {
    const mailer = configService.get<MailerConfig>('mailer');
    console.log("mailer configurations: ", mailer)
    this.mailer = createTransport({
      service: 'gmail',
      host: mailer?.host,
      port: mailer?.port,
      secure: true,
      auth: {
        user: mailer?.user,
        pass: mailer?.pass,
      },
    });
  }

  /**
   *
   * @param to  email address
   * @param otp
   * @returns observable
   */
  sendOtpVerifyEmail(to: string, token: string) {
    return from(
      this.mailer.sendMail({
        to,
        from: {
          name: EMAIL_TEMPLATE.VERIFY_SIGN_UP.NAME,
          address: 'No reply noreply@tangkinhcode.com',
        },
        subject: EMAIL_TEMPLATE.VERIFY_SIGN_UP.SUBJECT_VRF,
        html: EMAIL_TEMPLATE.VERIFY_SIGN_UP.HTML.replace('${token}', token),
      })
    );
  }

  /**
   *
   * @param to email address
   * @param otp
   * @returns observable
   */
  sendResetPasswordEmail(to: string, otp: string) {
    return from(
      this.mailer.sendMail({
        to,
        from: {
          name: 'TangKinhCode',
          address: 'No reply noreply@tangkinhcode.com',
        },
        subject: EMAIL_TEMPLATE.FORGOT_PASSWRD.SUBJECT_RS,
        html: EMAIL_TEMPLATE.FORGOT_PASSWRD.HTML.replace('${otp}', otp),
      })
    );
  }
}
