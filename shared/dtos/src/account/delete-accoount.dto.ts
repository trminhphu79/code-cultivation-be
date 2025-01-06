import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteAccountDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'User id need to delete',
    example: '8685-bdhh34-555123-6662312',
  })
  id!: string;
}
