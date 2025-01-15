import { Module } from '@nestjs/common';
import { RealmService } from './realm.service';
import { RealmController } from './realm.controller';
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
  controllers: [RealmController],
  providers: [RealmService],
})
export class RealmModule {}
