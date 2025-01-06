import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAchievementDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Sơ cấp thuật đạo',
    default: 'Sơ cấp thuật đạo',
  })
  name!: string;

  @ApiProperty({
    example: 'Hình ảnh mô tả cấp bậc cảnh giới hiện tại',
    default: 'url',
  })
  @IsNotEmpty()
  logo!: string;
}
