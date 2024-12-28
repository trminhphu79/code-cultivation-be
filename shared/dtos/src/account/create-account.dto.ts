import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsStrongPassword } from 'shared/validations/src/password-validation';
import { IsPasswordMatch } from 'shared/validations/src/password-match';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the account.',
    example: 'tangkinhcode@example.com',
  })
  email!: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    description:
      'Password must be at least 8 characters long and contain at least one number.',
    example: 'vodich123',
  })
  password!: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    description: 'Confirm password must match the password.',
    example: 'vodich123',
  })
  @IsPasswordMatch('password', {
    message: 'Password and confirm password must match.',
  })
  confirmPassword!: string;
}
