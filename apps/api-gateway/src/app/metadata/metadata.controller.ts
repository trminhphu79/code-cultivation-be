import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MetadataService } from './metadata.service';
import {
  CreateAchievementDto,
  CreateMaterialArtDto,
  CreateRealmDto,
  CreateSectDto,
} from '@shared/dtos/metadata';
import { Public } from '@shared/guard';
import { ApiConsumes, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';

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

@Controller('metadata')
export class MetadataController {
  constructor(private service: MetadataService) {}

  @Public()
  @Post('realm/create')
  @ApiOkResponse({
    description: 'Tạo ra một cảnh giới thành công.',
    schema: {
      example: {
        data: {
          level: 1,
          createdAt: '2025-01-06T17:18:59.169Z',
          updatedAt: '2025-01-06T17:18:59.170Z',
          id: '154dd1e2-4613-426e-b004-d230fa5e4a99',
          name: 'Luyện khí cảnh',
          description: 'Mô tả cấp bậc cảnh giới hiện tại',
        },
        message: 'Tạo thành công cấp bậc tu luyện.',
      },
    },
  })
  createRealm(@Body() dto: CreateRealmDto) {
    return this.service.createRealm(dto);
  }

  @Public()
  @Patch('realm/update')
  updateRealm(@Body() dto) {
    return this.service.updateRealm(dto);
  }

  @Public()
  @Delete('realm/delete/:id')
  @ApiOperation({
    summary:
      'Khai trừ vĩnh viễn cảnh giới này khỏi tam thập tam thiên đại thế giới.',
  })
  deleteRealm(@Param('id') id: string) {
    return this.service.deleteRealm({ id });
  }

  @Public()
  @Post('materialArt/create')
  @ApiConsumes('multipart/form-data')
  @ApiFile('logo')
  @UseInterceptors(FileInterceptor('file'))
  createMaterialArt(@UploadedFile() file, @Body() dto: CreateMaterialArtDto) {
    console.log('createMaterialArt DTO: ', dto);
    console.log('createMaterialArt file: ', typeof file);
    return this.service.createMaterialArt({ ...dto, logo: file });
  }

  @Public()
  @Patch('materialArt/update')
  updateMaterialArt(@Body() dto) {
    return this.service.updateMaterialArt(dto);
  }

  @Public()
  @ApiOperation({
    summary:
      'Khai trừ vĩnh viễn võ học này khỏi tam thập tam thiên đại thế giới.',
  })
  @Delete('materialArt/delete/:id')
  deleteMaterialArt(@Param('id') id: string) {
    return this.service.deleteMaterialArt({ id });
  }

  @Public()
  @Post('achievement/create')
  @ApiOkResponse({
    description: 'Tạo ra một cảnh giới thành công.',
    schema: {
      example: {
        data: {
          id: '9b2f6a4b-8489-4d01-9ad4-4008b76b8268',
          name: 'Sơ cấp thuật đạo',
          logo: 'Hình ảnh mô tả cấp bậc cảnh giới hiện tại',
          updatedAt: '2025-01-06T17:19:30.161Z',
          createdAt: '2025-01-06T17:19:30.161Z',
        },
        message: 'Tạo thành công thành tựu.',
      },
    },
  })
  createAchievement(@Body() dto: CreateAchievementDto) {
    return this.service.createAchievement(dto);
  }
  @Public()
  @Patch('achievement/update')
  updateAchievement(@Body() dto) {
    return this.service.updateAchievement(dto);
  }
  @Public()
  @Delete('achievement/delete/:id')
  @ApiOperation({
    summary:
      'Khai trừ vĩnh viễn thành tựu này khỏi tam thập tam thiên đại thế giới.',
  })
  deleteAchievement(@Param('id') id: string) {
    return this.service.deleteAchievement({ id });
  }
  @Public()
  @Post('sect/create')
  @ApiOkResponse({
    description: 'Tạo ra một cảnh giới thành công.',
    schema: {
      example: {
        data: {
          id: '7b01a7b1-ebcc-491e-af5e-68126001c848',
          name: 'Frontend',
          description: 'Mô môn phái hiện tại.',
          logo: 'Mô tả hình ảnh của môn phái',
          updatedAt: '2025-01-06T17:19:57.289Z',
          createdAt: '2025-01-06T17:19:57.289Z',
        },
        message: 'Tạo thành công môn phái.',
      },
    },
  })
  createSect(@Body() dto: CreateSectDto) {
    return this.service.createSect(dto);
  }
  @Public()
  @Patch('sect/update')
  updateSect(@Body() dto) {
    return this.service.updateSect(dto);
  }

  @Public()
  @Delete('sect/delete/:id')
  @ApiOperation({
    summary:
      'Khai trừ vĩnh viễn môn phái này khỏi tam thập tam thiên đại thế giới.',
  })
  deleteSect(@Param('id') id: string) {
    return this.service.deleteSect({ id });
  }
}

// materialals
// realm
