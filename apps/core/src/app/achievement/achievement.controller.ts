import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateAchievementDto,
  MetadataPaginationDto,
  UpdateAchievementDto,
} from '@shared/dtos/metadata';
import { AchievementPattern } from '@shared/message-pattern/metadata';
import { AchievementService } from './achievement.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Achievement')
@Controller()
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @MessagePattern(AchievementPattern.Create)
  create(@Payload() dto: CreateAchievementDto) {
    return this.achievementService.create(dto);
  }

  @MessagePattern(AchievementPattern.FindAll)
  findAll(@Payload() dto: MetadataPaginationDto) {
    return this.achievementService.findAll(dto);
  }

  @MessagePattern(AchievementPattern.FindOne)
  findOne(@Payload() id: string) {
    return this.achievementService.findOne(id);
  }

  @MessagePattern(AchievementPattern.Update)
  update(@Payload() dto: UpdateAchievementDto) {
    return this.achievementService.update(dto.id, dto);
  }

  @MessagePattern(AchievementPattern.Delete)
  remove(@Payload() id: string) {
    return this.achievementService.remove(id);
  }
}
