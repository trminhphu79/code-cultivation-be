import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSectDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Frontend',
    default: 'Frontend',
  })
  name!: string;

  @ApiProperty({
    example: 'Mô môn phái hiện tại.',
    default: 'Mô môn phái hiện tại.',
  })
  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Mô tả hình ảnh của môn phái',
    default: 'Mô tả hình ảnh của môn phái',
  })
  logo!: string;
}
