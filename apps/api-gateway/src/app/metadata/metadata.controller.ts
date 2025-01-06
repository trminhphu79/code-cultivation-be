import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import {
  CreateAchievementDto,
  CreateMaterialArtDto,
  CreateRealmDto,
  CreateSectDto,
} from '@shared/dtos/metadata';
import { Public } from '@shared/guard';
import { ApiOkResponse } from '@nestjs/swagger';

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
  @Delete('realm/:id')
  deleteRealm(@Param('id') id) {
    return this.service.deleteRealm({ id });
  }

  @Public()
  @Post('materialArt/create')
  createMaterialArt(@Body() dto: CreateMaterialArtDto) {
    return this.service.createMaterialArt(dto);
  }

  @Public()
  @Patch('materialArt/update')
  updateMaterialArt(@Body() dto) {
    return this.service.updateMaterialArt(dto);
  }

  @Public()
  @Delete('materialArt/:id')
  deleteMaterialArt(@Param('id') id) {
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
  @Delete('achievement/:id')
  deleteAchievement(@Param('id') id) {
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
  @Delete('sect/:id')
  deleteSect(@Param('id') id) {
    return this.service.deleteSect({ id });
  }
}

// materialals
// realm
