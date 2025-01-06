import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ClassProvider } from '@nestjs/common/interfaces';
import { FirebaseConstants } from './fire-storage.constant';
import {
  FirebaseModuleAsyncOptions,
  FireStorageModuleOptions,
  FireStorageModuleOptionsFactory,
} from './fire-storage.type';
import { getFirebaseInstance } from './fire-storage.util';

@Global()
@Module({})
export class FirebaseModule {
  public static forRoot(options: FireStorageModuleOptions): DynamicModule {
    const provider: Provider<FireStorageModuleOptions> = {
      provide: FirebaseConstants.FIREBASE_TOKEN,
      useValue: getFirebaseInstance(options),
    };

    return {
      exports: [provider],
      module: FirebaseModule,
      providers: [provider],
    };
  }

  public static forRootAsync(
    options: FirebaseModuleAsyncOptions
  ): DynamicModule {
    const firebaseProvider: Provider = {
      inject: [FirebaseConstants.FIREBASE_MODULE],
      provide: FirebaseConstants.FIREBASE_TOKEN,
      useFactory: (options: FireStorageModuleOptions) =>
        getFirebaseInstance(options),
    };

    const asyncProviders = FirebaseModule.createAsyncProviders(options);
    return {
      module: FirebaseModule,
      imports: [...(options.imports || [])],
      providers: [...asyncProviders, firebaseProvider],
      exports: [firebaseProvider],
    };
  }

  private static createAsyncProviders(
    options: FirebaseModuleAsyncOptions
  ): Provider[] {
    if (options.useFactory || options.useExisting) {
      return [FirebaseModule.createAsyncOptionsProvider(options)];
    }
    return [
      FirebaseModule.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
        inject: options.inject,
      } as ClassProvider,
    ];
  }

  private static createAsyncOptionsProvider(
    options: FirebaseModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: FirebaseConstants.FIREBASE_MODULE,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: FirebaseConstants.FIREBASE_MODULE,
      useFactory: async (
        optionsFactory: FireStorageModuleOptionsFactory
      ): Promise<FireStorageModuleOptions> =>
        await optionsFactory.createFireStorageModuleOptions(),
      inject: options.useClass ? [options.useClass] : [],
    };
  }
}
