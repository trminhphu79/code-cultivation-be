import { Module } from '@nestjs/common';
import { SectService } from './sect.service';
import { SectController } from './sect.controller';
import { DatabaseConfigFeature, DatabaseConfigModule } from '@shared/database';
import { FileUploaderModule } from '@shared/file-uploader';

@Module({
  imports: [
    DatabaseConfigModule,
    DatabaseConfigFeature,
    FileUploaderModule.forRoot({
      publicKey: process.env['IMAGE_KIT_PUBLIC_KEY'],
      urlEndpoint: process.env['IMAGE_KIT_ENDPOINT'],
      privateKey: process.env['IMAGE_KIT_PRIVATE_KEY'],
    }),
  ],
  controllers: [SectController],
  providers: [SectService],
})
export class SectModule {}
