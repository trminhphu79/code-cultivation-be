import { FactoryProvider, ModuleMetadata, Type } from '@nestjs/common';
import {
  ImageKitOptions,
  UploadOptions,
  UploadResponse,
} from 'imagekit/dist/libs/interfaces';
import IKResponse from 'imagekit/dist/libs/interfaces/IKResponse';
import { Observable } from 'rxjs';

export type FileUploaderOptions = ImageKitOptions;

export type FileUploaderModuleAsyncOptions = Partial<{
  useClass: Type<FileUploadereModuleOptionsFactory>;
  useFactory: (
    ...args: unknown[]
  ) => Promise<FileUploaderOptions> | FileUploaderOptions;
  inject: FactoryProvider<FileUploaderOptions>['inject'];
  useExisting: Type<FileUploadereModuleOptionsFactory>;
}> &
  Pick<ModuleMetadata, 'imports'>;

export interface FileUploadereModuleOptionsFactory {
  createFileUploaderModuleOptions():
    | Promise<FileUploaderOptions>
    | FileUploaderOptions;
}

export abstract class FileUploader {
  abstract initizeUploader: (options: FileUploaderOptions) => void;
  abstract upload: (
    payload: Pick<UploadOptions, 'file' | 'fileName' | 'folder'>
  ) => Observable<IKResponse<UploadResponse>>;
}
