import {
  RealmPattern,
  AchievementPattern,
  SectPattern,
  MaterialArtPattern,
} from '@shared/message-pattern/metadata';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateAchievementDto,
  CreateMaterialArtDto,
  CreateRealmDto,
  CreateSectDto,
  MetadataPaginationDto,
  UpdateAchievementDto,
  UpdateRealmDto,
  UpdateSectDto,
  UpdateMaterialArtDto,
} from '@shared/dtos/metadata';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { tap } from 'rxjs';

export const ApiFile =
  (fileName: string): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };

// @Roles(Role.ADMIN)
// @UseGuards(RoleGuard)
@Controller('metadata')
export class MetadataController {
  constructor(
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy
  ) {}

  @Post('realm/create')
  @ApiOperation({ summary: 'Tạo mới một cảnh giới tu luyện' })
  @ApiOkResponse({
    description: 'Tạo ra một cảnh giới thành công',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '154dd1e2-4613-426e-b004-d230fa5e4a99',
            },
            name: { type: 'string', example: 'Luyện khí cảnh' },
            level: { type: 'number', example: 1 },
            description: {
              type: 'string',
              example: 'Mô tả cấp bậc cảnh giới hiện tại',
            },
            createdAt: { type: 'string', example: '2025-01-06T17:18:59.169Z' },
            updatedAt: { type: 'string', example: '2025-01-06T17:18:59.170Z' },
          },
        },
        message: { type: 'string', example: 'Tạo thành công cấp bậc tu luyện' },
      },
    },
  })
  createRealm(@Body() dto: CreateRealmDto) {
    return this.natsClient.send(RealmPattern.Create, dto);
  }

  @Patch('realm/update')
  @ApiOperation({ summary: 'Cập nhật thông tin cảnh giới' })
  @ApiOkResponse({
    description: 'Cập nhật cảnh giới thành công',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            level: { type: 'number' },
            description: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string', example: 'Cập nhật cảnh giới thành công' },
      },
    },
  })
  updateRealm(@Body() dto: UpdateRealmDto) {
    return this.natsClient.send(RealmPattern.Update, dto);
  }

  @Get('realm/findOne/:id')
  @ApiOperation({ summary: 'Tìm kiếm một cảnh giới theo ID' })
  @ApiOkResponse({
    description: 'Tìm thấy cảnh giới',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            level: { type: 'number' },
            description: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string', example: 'Tìm thấy cảnh giới' },
      },
    },
  })
  findOneRealm(@Param('id') id: string) {
    return this.natsClient.send(RealmPattern.FindOne, id);
  }

  @Post('realm/findAll')
  @ApiOperation({ summary: 'Lấy danh sách tất cả cảnh giới với phân trang' })
  @ApiOkResponse({
    description: 'Lấy danh sách cảnh giới thành công',
    schema: {
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              level: { type: 'number' },
              description: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            offset: { type: 'number' },
            limit: { type: 'number' },
          },
        },
        message: {
          type: 'string',
          example: 'Lấy danh sách cảnh giới thành công',
        },
      },
    },
  })
  findAllRealm(@Body() dto: MetadataPaginationDto) {
    return this.natsClient.send(RealmPattern.FindAll, dto);
  }

  @Delete('realm/delete/:id')
  @ApiOperation({
    summary:
      'Khai trừ vĩnh viễn cảnh giới này khỏi tam thập tam thiên đại thế giới',
  })
  @ApiOkResponse({
    description: 'Xóa cảnh giới thành công',
    schema: {
      properties: {
        data: null,
        message: { type: 'string', example: 'Đã xóa cảnh giới thành công' },
      },
    },
  })
  deleteRealm(@Param('id') id: string) {
    return this.natsClient.send(RealmPattern.Delete, id);
  }

  @Post('materialArt/create')
  @ApiOperation({ summary: 'Tạo mới một võ học' })
  @ApiOkResponse({
    description: 'Tạo ra một võ học thành công',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '7b01a7b1-ebcc-491e-af5e-68126001c848',
            },
            name: { type: 'string', example: 'Kiếm Đạo' },
            description: { type: 'string', example: 'Mô tả về võ học' },
            level: { type: 'number', example: 1 },
            sectId: {
              type: 'string',
              example: '9b2f6a4b-8489-4d01-9ad4-4008b76b8268',
            },
            createdAt: { type: 'string', example: '2025-01-06T17:19:57.289Z' },
            updatedAt: { type: 'string', example: '2025-01-06T17:19:57.289Z' },
          },
        },
        message: { type: 'string', example: 'Tạo thành công võ học' },
      },
    },
  })
  createMaterialArt(@Body() dto: CreateMaterialArtDto) {
    return this.natsClient.send(MaterialArtPattern.Create, dto);
  }

  @Get('materialArt/findOne/:id')
  @ApiOperation({ summary: 'Tìm kiếm một võ học theo ID' })
  @ApiOkResponse({
    description: 'Tìm thấy võ học',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            level: { type: 'number' },
            sectId: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string', example: 'Tìm thấy võ học' },
      },
    },
  })
  findOneMaterialArt(@Param('id') id: string) {
    return this.natsClient.send(MaterialArtPattern.FindOne, id);
  }

  @Post('materialArt/findAll')
  @ApiOperation({ summary: 'Lấy danh sách tất cả võ học với phân trang' })
  @ApiOkResponse({
    description: 'Lấy danh sách võ học thành công',
    schema: {
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              level: { type: 'number' },
              sectId: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            offset: { type: 'number' },
            limit: { type: 'number' },
          },
        },
        message: { type: 'string', example: 'Lấy danh sách võ học thành công' },
      },
    },
  })
  findAllMaterialArt(@Body() dto: MetadataPaginationDto) {
    return this.natsClient.send(MaterialArtPattern.FindAll, dto);
  }

  @Patch('materialArt/update')
  @ApiOperation({ summary: 'Cập nhật thông tin võ học' })
  @ApiOkResponse({
    description: 'Cập nhật võ học thành công',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            level: { type: 'number' },
            sectId: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string', example: 'Cập nhật võ học thành công' },
      },
    },
  })
  updateMaterialArt(@Body() dto: UpdateMaterialArtDto) {
    return this.natsClient.send(MaterialArtPattern.Update, dto);
  }

  @Delete('materialArt/delete/:id')
  @ApiOperation({
    summary:
      'Khai trừ vĩnh viễn võ học này khỏi tam thập tam thiên đại thế giới',
  })
  @ApiOkResponse({
    description: 'Xóa võ học thành công',
    schema: {
      properties: {
        data: null,
        message: { type: 'string', example: 'Đã xóa võ học thành công' },
      },
    },
  })
  deleteMaterialArt(@Param('id') id: string) {
    return this.natsClient.send(MaterialArtPattern.Delete, id);
  }

  @Post('achievement/create')
  @ApiOperation({ summary: 'Tạo mới một thành tựu' })
  @ApiOkResponse({
    description: 'Tạo ra một thành tựu thành công',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '9b2f6a4b-8489-4d01-9ad4-4008b76b8268',
            },
            name: { type: 'string', example: 'Sơ cấp thuật đạo' },
            logo: {
              type: 'string',
              example: 'Hình ảnh mô tả thành tựu',
            },
            createdAt: { type: 'string', example: '2025-01-06T17:19:30.161Z' },
            updatedAt: { type: 'string', example: '2025-01-06T17:19:30.161Z' },
          },
        },
        message: { type: 'string', example: 'Tạo thành công thành tựu' },
      },
    },
  })
  createAchievement(@Body() dto: CreateAchievementDto) {
    return this.natsClient.send(AchievementPattern.Create, dto);
  }

  @Get('achievement/findOne/:id')
  @ApiOperation({ summary: 'Tìm kiếm một thành tựu theo ID' })
  @ApiOkResponse({
    description: 'Tìm thấy thành tựu',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            logo: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string', example: 'Tìm thấy thành tựu' },
      },
    },
  })
  findOneAchievement(@Param('id') id: string) {
    return this.natsClient.send(AchievementPattern.FindOne, id);
  }

  @Post('achievement/findAll')
  @ApiOperation({ summary: 'Lấy danh sách tất cả thành tựu với phân trang' })
  @ApiOkResponse({
    description: 'Lấy danh sách thành tựu thành công',
    schema: {
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              logo: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            offset: { type: 'number' },
            limit: { type: 'number' },
          },
        },
        message: {
          type: 'string',
          example: 'Lấy danh sách thành tựu thành công',
        },
      },
    },
  })
  findAllAchievement(@Body() dto: MetadataPaginationDto) {
    return this.natsClient
      .send(AchievementPattern.FindAll, dto)
      .pipe(tap(() => Logger.log('findAllAchievement success')));
  }

  @Patch('achievement/update')
  @ApiOperation({ summary: 'Cập nhật thông tin thành tựu' })
  @ApiOkResponse({
    description: 'Cập nhật thành tựu thành công',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            logo: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string', example: 'Cập nhật thành tựu thành công' },
      },
    },
  })
  updateAchievement(@Body() dto: UpdateAchievementDto) {
    return this.natsClient.send(AchievementPattern.Update, dto);
  }

  @Delete('achievement/delete/:id')
  @ApiOperation({
    summary:
      'Khai trừ vĩnh viễn thành tựu này khỏi tam thập tam thiên đại thế giới',
  })
  @ApiOkResponse({
    description: 'Xóa thành tựu thành công',
    schema: {
      properties: {
        data: null,
        message: { type: 'string', example: 'Đã xóa thành tựu thành công' },
      },
    },
  })
  deleteAchievement(@Param('id') id: string) {
    return this.natsClient.send(AchievementPattern.Delete, id);
  }

  @Post('sect/create')
  @ApiOperation({ summary: 'Tạo mới một môn phái' })
  @ApiOkResponse({
    description: 'Tạo ra một môn phái thành công',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '7b01a7b1-ebcc-491e-af5e-68126001c848',
            },
            name: { type: 'string', example: 'Frontend' },
            description: { type: 'string', example: 'Mô tả môn phái hiện tại' },
            logo: { type: 'string', example: 'Mô tả hình ảnh của môn phái' },
            updatedAt: { type: 'string', example: '2025-01-06T17:19:57.289Z' },
            createdAt: { type: 'string', example: '2025-01-06T17:19:57.289Z' },
          },
        },
        message: { type: 'string', example: 'Tạo thành công môn phái' },
      },
    },
  })
  createSect(@Body() dto: CreateSectDto) {
    return this.natsClient.send(SectPattern.Create, dto);
  }

  @Get('sect/findOne/:id')
  @ApiOperation({ summary: 'Tìm kiếm một môn phái theo ID' })
  @ApiOkResponse({
    description: 'Tìm thấy môn phái',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            logo: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string', example: 'Tìm thấy môn phái' },
      },
    },
  })
  findOneSect(@Param('id') id: string) {
    return this.natsClient.send(SectPattern.FindOne, id);
  }

  @Post('sect/findAll')
  @ApiOperation({ summary: 'Lấy danh sách tất cả môn phái với phân trang' })
  @ApiOkResponse({
    description: 'Lấy danh sách môn phái thành công',
    schema: {
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              logo: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            offset: { type: 'number' },
            limit: { type: 'number' },
          },
        },
        message: {
          type: 'string',
          example: 'Lấy danh sách môn phái thành công',
        },
      },
    },
  })
  findAllSect(@Body() dto: MetadataPaginationDto) {
    return this.natsClient
      .send(SectPattern.FindAll, dto)
      .pipe(tap(() => Logger.log('findAllSect success')));
  }

  @Patch('sect/update')
  @ApiOperation({ summary: 'Cập nhật thông tin môn phái' })
  @ApiOkResponse({
    description: 'Cập nhật môn phái thành công',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            logo: { type: 'string' },
            updatedAt: { type: 'string' },
            createdAt: { type: 'string' },
          },
        },
        message: { type: 'string', example: 'Cập nhật môn phái thành công' },
      },
    },
  })
  updateSect(@Body() dto: UpdateSectDto) {
    return this.natsClient.send(SectPattern.Update, dto);
  }

  @Delete('sect/delete/:id')
  @ApiOperation({
    summary:
      'Khai trừ vĩnh viễn môn phái này khỏi tam thập tam thiên đại thế giới',
  })
  @ApiOkResponse({
    description: 'Xóa môn phái thành công',
    schema: {
      properties: {
        data: null,
        message: { type: 'string', example: 'Đã xóa môn phái thành công' },
      },
    },
  })
  deleteSect(@Param('id') id: string) {
    return this.natsClient.send(SectPattern.Delete, id);
  }
}
