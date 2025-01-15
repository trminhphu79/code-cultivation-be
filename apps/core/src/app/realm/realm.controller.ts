import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RealmService } from './realm.service';
import {
  CreateRealmDto,
  UpdateRealmDto,
  MetadataPaginationDto,
} from '@shared/dtos/metadata';
import { RealmPattern } from '@shared/message-pattern/metadata';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Realm')
@Controller()
export class RealmController {
  constructor(private readonly realmService: RealmService) {}

  @MessagePattern(RealmPattern.Create)
  create(@Payload() dto: CreateRealmDto) {
    return this.realmService.create(dto);
  }

  @MessagePattern(RealmPattern.FindAll)
  findAll(@Payload() dto: MetadataPaginationDto) {
    return this.realmService.findAll(dto);
  }

  @MessagePattern(RealmPattern.FindOne)
  findOne(@Payload() id: string) {
    return this.realmService.findOne(id);
  }

  @MessagePattern(RealmPattern.Update)
  update(@Payload() dto: UpdateRealmDto) {
    return this.realmService.update(dto.id, dto);
  }

  @MessagePattern(RealmPattern.Delete)
  remove(@Payload() id: string) {
    return this.realmService.remove(id);
  }
}
