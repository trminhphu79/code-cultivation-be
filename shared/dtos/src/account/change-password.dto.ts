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
    example: 'vodich123',
  })
  newPassword!: string;

  @IsNotEmpty()
  @IsStrongPassword()
  currentPassword!: string;
}
