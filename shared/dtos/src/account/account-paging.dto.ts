import { PagingDto } from '../common/paging.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '@shared/guard';

export class AccountPagingDto extends PagingDto {
  @ApiProperty({
    description: 'Filter by user role',
    required: false,
    enum: Role,
    example: Role.USER,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
