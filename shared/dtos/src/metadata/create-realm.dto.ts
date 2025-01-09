import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRealmDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Luyện khí cảnh',
  })
  name!: string;

  @ApiProperty({
    example: 'Mô tả cảnh giới hiện tại',
  })
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    example: 'Mô tả cấp bậc cảnh giới hiện tại',
  })
  @IsNotEmpty()
  level!: number;
}
