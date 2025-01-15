import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateSectDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'xxxx',
  })
  id!: string;

  @ApiProperty({
    example: 'Frontend',
  })
  name!: string;

  @ApiProperty({
    example: 'Mô môn phái hiện tại.',
  })
  description!: string;

  @ApiProperty({
    example: 'Mô tả hình ảnh của môn phái',
  })
  logo!: string;
}
