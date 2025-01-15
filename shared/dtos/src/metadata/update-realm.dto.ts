import { ApiProperty } from '@nestjs/swagger';

export class UpdateRealmDto {
  @ApiProperty({
    example: 'xxxx',
  })
  id!: string;

  @ApiProperty({
    example: 'Luyện khí cảnh',
  })
  name!: string;

  @ApiProperty({
    example: 'Mô tả cảnh giới hiện tại',
  })
  description!: string;

  @ApiProperty({
    example: 'Mô tả cấp bậc cảnh giới hiện tại',
  })
  level!: number;
}
