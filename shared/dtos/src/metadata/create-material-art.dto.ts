import { ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMaterialArtDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Angular Thần Công',
    default: 'Angular Thần Công',
  })
  name!: string;

  @ApiProperty({
    example: 'Mô tả môn võ học',
    default: 'Description',
  })
  description!: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Thông tin Id của môn phái tạo ra môn võ học này.',
    default: 'xxxx',
  })
  sectId!: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Mô tả hình ảnh của bộ môn võ công',
    default: 'url',
  })
  logo!: string;
}
