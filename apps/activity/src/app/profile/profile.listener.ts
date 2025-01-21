import {
  ActivitySocket,
  ActivityPattern,
} from '@shared/message-pattern/activity';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { ProfileGateway } from './profile.gateway';

@Injectable()
export class ProfileListener implements OnModuleInit {
  private readonly logger = new Logger(ProfileListener.name);
  constructor(
    private profileGateway: ProfileGateway,
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy
  ) {}

  async onModuleInit() {
    this.natsClient.connect().then(() => {
      this.logger.log('Activity Service Connected to NATS');
    });
  }

  @MessagePattern(ActivityPattern.UpdateExperience)
  handleProfileEvent(data: any) {
    this.logger.log(`handleProfileEvent ${data.profileId}`);
    this.profileGateway.emitToProfile(
      data.profileId,
      ActivitySocket.ProfileAddExperience,
      data
    );
  }
}
