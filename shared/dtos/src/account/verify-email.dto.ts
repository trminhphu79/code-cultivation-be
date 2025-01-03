import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyEmailOtp {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Token use for verify email',
    example: '123456',
  })
  token!: string;
}
