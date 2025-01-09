import {
  ClassProvider,
  DynamicModule,
  Global,
  Module,
  Provider,
} from '@nestjs/common';
import {
  FileUploader,
  FileUploadereModuleOptionsFactory,
  FileUploaderModuleAsyncOptions,
  FileUploaderOptions,
} from './file-uploader.type';
import { FileUploaderService } from './file-uploader.service';
import {
  FILE_UPLOADER_OPTIONS_TOKEN,
  FILE_UPLOADER_MODULE_TOKEN,
  FILE_UPLOADER_TOKEN,
} from './file-uploader.constants';

@Global()
@Module({})
export class FileUploaderModule {
  public static forRoot(options: FileUploaderOptions): DynamicModule {
    const provider: Provider<FileUploaderOptions> = {
      provide: FILE_UPLOADER_OPTIONS_TOKEN,
      useValue: options,
    };

    const fileUploader: Provider<FileUploader> = {
      provide: FILE_UPLOADER_TOKEN,
      useClass: FileUploaderService,
    };

    return {
      exports: [provider, fileUploader],
      module: FileUploaderModule,
      providers: [provider, fileUploader],
    };
  }

  public static forRootAsync(
    options: FileUploaderModuleAsyncOptions
  ): DynamicModule {
    const fileUploaderProvider: Provider = {
      inject: [FILE_UPLOADER_MODULE_TOKEN],
      provide: FILE_UPLOADER_OPTIONS_TOKEN,
      useFactory: (_options: FileUploaderOptions) => options.useFactory,
    };

    const asyncProviders = FileUploaderModule.createAsyncProviders(options);
    return {
      module: FileUploaderModule,
      imports: [...(options.imports || [])],
      providers: [...asyncProviders, fileUploaderProvider],
      exports: [fileUploaderProvider],
    };
  }

  private static createAsyncProviders(
    options: FileUploaderModuleAsyncOptions
  ): Provider[] {
    if (options.useFactory || options.useExisting) {
      return [FileUploaderModule.createAsyncOptionsProvider(options)];
    }
    return [
      FileUploaderModule.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
        inject: options.inject,
      } as ClassProvider,
    ];
  }

  private static createAsyncOptionsProvider(
    options: FileUploaderModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: FILE_UPLOADER_MODULE_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: FILE_UPLOADER_MODULE_TOKEN,
      useFactory: async (
        optionsFactory: FileUploadereModuleOptionsFactory
      ): Promise<FileUploaderOptions> =>
        await optionsFactory.createFileUploaderModuleOptions(),
      inject: options.useClass ? [options.useClass] : [],
    };
  }
}
