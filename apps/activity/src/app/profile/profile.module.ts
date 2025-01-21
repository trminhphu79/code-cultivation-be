import { Module } from '@nestjs/common';
import { ProfileGateway } from './profile.gateway';
import { ProfileListener } from './profile.listener';
import { NatsClientModule } from '@shared/nats-client';

@Module({
  imports: [NatsClientModule],
  providers: [ProfileListener, ProfileGateway],
})
export class ProfileModule {}
