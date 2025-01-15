import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SectService } from './sect.service';
import {
  CreateSectDto,
  UpdateSectDto,
  MetadataPaginationDto,
} from '@shared/dtos/metadata';
import { SectPattern } from '@shared/message-pattern/metadata';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Sect } from '@shared/models/sect';

interface ServiceResponse<T> {
  data: T;
  message: string;
}

@ApiTags('Sect')
@Controller()
export class SectController {
  constructor(private readonly sectService: SectService) {}

  @ApiOperation({ summary: 'Create a new sect' })
  @ApiOkResponse({
    description: 'The sect has been successfully created',
    schema: {
      properties: {
        data: { $ref: '#/components/schemas/Sect' },
        message: { type: 'string', example: 'Môn phái đã được tạo thành công' },
      },
    },
  })
  @MessagePattern(SectPattern.Create)
  create(@Payload() dto: CreateSectDto) {
    return this.sectService.create(dto);
  }

  @ApiOperation({ summary: 'Get all sects with pagination' })
  @ApiOkResponse({
    description: 'List of sects retrieved successfully',
    schema: {
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Sect' },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
          },
        },
        message: { type: 'string', example: 'Lấy danh sách môn phái thành công' },
      },
    },
  })
  @MessagePattern(SectPattern.FindAll)
  findAll(@Payload() dto: MetadataPaginationDto) {
    return this.sectService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get a sect by id' })
  @ApiOkResponse({
    description: 'The sect has been found',
    schema: {
      properties: {
        data: { $ref: '#/components/schemas/Sect' },
        message: { type: 'string', example: 'Tìm thấy môn phái' },
      },
    },
  })
  @MessagePattern(SectPattern.FindOne)
  findOne(@Payload() id: string) {
    return this.sectService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a sect' })
  @ApiOkResponse({
    description: 'The sect has been successfully updated',
    schema: {
      properties: {
        data: { $ref: '#/components/schemas/Sect' },
        message: { type: 'string', example: 'Cập nhật môn phái thành công' },
      },
    },
  })
  @MessagePattern(SectPattern.Update)
  update(@Payload() dto: UpdateSectDto) {
    return this.sectService.update(dto.id, dto);
  }

  @ApiOperation({ summary: 'Delete a sect' })
  @ApiOkResponse({
    description: 'The sect has been successfully deleted',
    schema: {
      properties: {
        data: { type: 'null' },
        message: { type: 'string', example: 'Đã xóa môn phái thành công' },
      },
    },
  })
  @MessagePattern(SectPattern.Delete)
  remove(@Payload() id: string) {
    return this.sectService.remove(id);
  }
}
