import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfileMsgPattern } from '@shared/message-pattern/account';
import { ProfileService } from './profile.service';
import {
  CreateSocialProfileDto,
  UpdateSocialProfileDto,
  DeleteSocialProfileDto,
} from '@shared/dtos/account';

@Injectable()
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @MessagePattern(ProfileMsgPattern.GetAllRelatedInfoProfile)
  handleGetDetailProfile(@Payload() id: string) {
    return this.profileService.handleGetDetailProfile(id);
  }

  @MessagePattern(ProfileMsgPattern.AddSocialProfile)
  handleAddSocialProfile(@Payload() body: CreateSocialProfileDto) {
    return this.profileService.handleAddSocialProfile(body);
  }

  @MessagePattern(ProfileMsgPattern.UpdateSocialProfile)
  handleUpdateSocialProfile(@Payload() body: UpdateSocialProfileDto) {
    return this.profileService.handleUpdateSocialProfile(body);
  }

  @MessagePattern(ProfileMsgPattern.DeleteSocialProfile)
  handleDeleteSocialProfile(@Payload() body: DeleteSocialProfileDto) {
    return this.profileService.handleDeleteSocialProfile(body);
  }
}
