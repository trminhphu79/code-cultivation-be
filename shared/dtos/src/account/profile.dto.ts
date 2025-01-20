import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSocialProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  profileId!: string;

  @ApiProperty()
  @IsNotEmpty()
  socialId!: string;

  @ApiProperty()
  @IsNotEmpty()
  link!: string;

  @ApiProperty()
  status!: string;
}

export class UpdateSocialProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;

  @ApiProperty()
  @IsNotEmpty()
  link!: string;

  @ApiProperty()
  @IsNotEmpty()
  status!: string;
}

export class DeleteSocialProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}
