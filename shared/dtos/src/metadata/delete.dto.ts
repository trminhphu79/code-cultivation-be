import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteDto {
  @ApiProperty({
    example: 'id here...',
  })
  @IsNotEmpty()
  id!: string;
}
