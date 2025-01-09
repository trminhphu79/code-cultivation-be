import { Inject } from '@nestjs/common';
import {
  FILE_UPLOADER_OPTIONS_TOKEN,
  FILE_UPLOADER_TOKEN,
} from './file-uploader.constants';

export function InjectFileUploaderOptions() {
  return Inject(FILE_UPLOADER_OPTIONS_TOKEN);
}

export function InjectFileUploader() {
  return Inject(FILE_UPLOADER_TOKEN);
}
