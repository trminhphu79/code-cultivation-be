import { ApiProperty } from '@nestjs/swagger';

export class UpdateMaterialArtDto {
  @ApiProperty({
    example: 'xxxx',
  })
  id!: string;

  @ApiProperty({
    example: 'Angular Thần Công',
  })
  name!: string;

  @ApiProperty({
    example: 'Mô tả môn võ học',
  })
  description!: string;

  @ApiProperty({
    example: 'Thông tin Id của môn phái tạo ra môn võ học này.',
  })
  sectId!: string;
}
