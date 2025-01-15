import { ApiProperty } from '@nestjs/swagger';

export class UpdateAchievementDto {
  @ApiProperty({
    example: 'xxxx',
  })
  id!: string;

  @ApiProperty({
    example: 'Sơ cấp thuật đạo',
  })
  name!: string;

  @ApiProperty({
    example: 'Hình ảnh mô tả cấp bậc cảnh giới hiện tại',
  })
  logo!: string;
}
