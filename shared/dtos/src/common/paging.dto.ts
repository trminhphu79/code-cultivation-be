import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Filter, SortOrder } from '@shared/query-builder';

export class PagingDto {
  @ApiProperty({
    description: 'Offset number for pagination',
    required: false,
    minimum: 1,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  offset?: number = 1;

  @ApiProperty({
    description: 'Limit number for pagination',
    required: false,
    minimum: 1,
    default: 10,
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({
    description: 'Search term to filter results across searchable fields',
    required: false,
    example: 'john',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Field name to sort results by',
    required: false,
    default: 'createdAt',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiProperty({
    description: 'Sort direction',
    required: false,
    enum: SortOrder,
    default: SortOrder.DESC,
    example: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;

  @ApiProperty({
    description: 'Advanced filter object',
    required: false,
    example: {
      field1: { value: 'value1', operator: 'equal' },
      field2: { value: [1, 100], operator: 'between' },
    },
  })
  @IsOptional()
  @IsObject()
  filter?: Record<string, Filter>;
}

export interface PagingMeta {
  offset: number;
  limit: number;
  total: number;
}

export interface PagingResponse<T> {
  data: T[];
  meta: PagingMeta;
  message?: string;
}
