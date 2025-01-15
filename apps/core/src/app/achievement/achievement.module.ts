import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { FileUploaderModule } from '@shared/file-uploader';
import { DatabaseConfigFeature, DatabaseConfigModule } from '@shared/database';

@Module({
  imports: [
    DatabaseConfigFeature,
    DatabaseConfigModule,
    FileUploaderModule.forRoot({
      publicKey: process.env['IMAGE_KIT_PUBLIC_KEY'],
      urlEndpoint: process.env['IMAGE_KIT_ENDPOINT'],
      privateKey: process.env['IMAGE_KIT_PRIVATE_KEY'],
    }),
  ],
  controllers: [AchievementController],
  providers: [AchievementService],
})
export class AchievementModule {}
