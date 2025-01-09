import { Injectable, Logger } from '@nestjs/common';
import ImageKit = require('imagekit');
import { InjectFileUploaderOptions } from './file-uploader.decorator';
import { FileUploader, FileUploaderOptions } from './file-uploader.type';
import { from, Observable } from 'rxjs';
import { UploadOptions, UploadResponse } from 'imagekit/dist/libs/interfaces';
import IKResponse from 'imagekit/dist/libs/interfaces/IKResponse';

@Injectable()
export class FileUploaderService implements FileUploader {
  private instance!: ImageKit;
  private logger = new Logger(FileUploaderService.name);

  constructor(@InjectFileUploaderOptions() options: FileUploaderOptions) {
    this.initizeUploader(options);
  }

  public initizeUploader(options: FileUploaderOptions) {
    this.instance = new ImageKit(options);
    this.logger.log('Init uploader instance....');
    console.log('initizeUploader: ', this.instance);
  }

  public upload(
    payload: Pick<UploadOptions, 'file' | 'fileName' | 'folder'>
  ): Observable<IKResponse<UploadResponse>> {
    this.logger.log('Start upload file to image kit....', payload.fileName);
    console.log('initizeUploader payload: ', payload);
    return from(this.instance.upload(payload));
  }
}
