import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMaterialArtDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Angular Thần Công',
  })
  name!: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Mô tả môn võ học',
  })
  description!: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Thông tin Id của môn phái tạo ra môn võ học này.',
  })
  sectId!: string;
}
