import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MaterialArtService } from './material-art.service';
import {
  CreateMaterialArtDto,
  MetadataPaginationDto,
  UpdateMaterialArtDto,
} from '@shared/dtos/metadata';
import { MaterialArtPattern } from '@shared/message-pattern/metadata';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MaterialArt')
@Controller()
export class MaterialArtController {
  constructor(private readonly materialArtService: MaterialArtService) {}

  @MessagePattern(MaterialArtPattern.Create)
  create(@Payload() dto: CreateMaterialArtDto) {
    return this.materialArtService.create(dto);
  }

  @MessagePattern(MaterialArtPattern.FindAll)
  findAll(@Payload() dto: MetadataPaginationDto) {
    return this.materialArtService.findAll(dto);
  }

  @MessagePattern(MaterialArtPattern.FindOne)
  findOne(@Payload() id: string) {
    return this.materialArtService.findOne(id);
  }

  @MessagePattern(MaterialArtPattern.Update)
  update(@Payload() dto: UpdateMaterialArtDto) {
    return this.materialArtService.update(dto.id, dto);
  }

  @MessagePattern(MaterialArtPattern.Delete)
  remove(@Payload() id: string) {
    return this.materialArtService.remove(id);
  }
}
