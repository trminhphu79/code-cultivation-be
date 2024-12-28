import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the account.',
    example: 'tangkinhcode@example.com',
  })
  email!: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Password must be not empty',
    example: 'vodich123',
  })
  password!: string;
}
