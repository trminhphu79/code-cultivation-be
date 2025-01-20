import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Token use for authenticate user',
    example: '8685-bdhh34-555123-6662312',
  })
  refreshToken!: string;
}

