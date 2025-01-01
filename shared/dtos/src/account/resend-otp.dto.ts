import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendVerifyEmail {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email use for resend otp to verify email',
    example: 'tangkinhcode@example.com',
  })
  email!: string;
}
