import { Module } from '@nestjs/common';
import { MaterialArtService } from './material-art.service';
import { MaterialArtController } from './material-art.controller';
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
  controllers: [MaterialArtController],
  providers: [MaterialArtService],
})
export class MaterialArtModule {}
