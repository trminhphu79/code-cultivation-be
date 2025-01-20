import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ActionExpType } from '@shared/types';

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

export class UpdateExpProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  actionType!: ActionExpType;
}
