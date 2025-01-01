import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyEmailOtp {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Otp use for verify email',
    example: '123456',
  })
  otp!: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email use for verify email',
    example: 'tangkinhcode@example.com',
  })
  email!: string;
}
