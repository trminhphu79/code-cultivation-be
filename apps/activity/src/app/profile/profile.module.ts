import { Module } from '@nestjs/common';
import { ProfileGateway } from './profile.gateway';
import { ProfileListener } from './profile.listener';

@Module({
  providers: [ProfileListener, ProfileGateway],
})
export class ProfileModule {}
