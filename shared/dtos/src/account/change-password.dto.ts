import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsStrongPassword } from '@shared/validation/password';
import { ApiProperty } from '@nestjs/swagger';
export class ChangePasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    description:
      'New password must be at least 8 characters long and contain at least one number.',
    example: 'chicken123',
  })
  newPassword!: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Your current password',
    example: 'vodich123',
  })
  currentPassword!: string;
}
