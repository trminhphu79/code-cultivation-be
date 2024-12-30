import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  bio!: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User name',
    example: 'Khoi Tran',
  })
  fullName!: string;

  avatarUrl!: string;

  githubLink!: string;
}
