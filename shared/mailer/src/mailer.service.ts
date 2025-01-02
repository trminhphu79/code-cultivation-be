import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerConfig } from '@shared/configs';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    // Initialize Nodemailer transporter
    const mailer = configService.get<MailerConfig>('mailer');
    this.transporter = nodemailer.createTransport({
      host: mailer?.host || 'smtp.example.com',
      port: mailer?.port || 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: mailer?.user || 'your_email@example.com',
        pass: mailer?.pass || 'your_password',
      },
    });
    console.log('transporter instance: ', this.transporter);
  }
  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<any> {
    const mailOptions = {
      from: '"No-Reply" <no-reply@tangkinhcode.com>',
      to,
      subject,
      text,
      html,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email: ', error);
      throw error;
    }
  }
}
