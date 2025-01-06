import type { Type } from '@nestjs/common';
import type {
  FactoryProvider,
  ModuleMetadata,
} from '@nestjs/common/interfaces';

export type FireStorageModuleOptions = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

export type FirebaseModuleAsyncOptions = {
  useClass?: Type<FireStorageModuleOptionsFactory>;
  useFactory?: (
    ...args: unknown[]
  ) => Promise<FireStorageModuleOptions> | FireStorageModuleOptions;
  inject?: FactoryProvider<FireStorageModuleOptions>['inject'];
  useExisting?: Type<FireStorageModuleOptionsFactory>;
} & Pick<ModuleMetadata, 'imports'>;

export interface FireStorageModuleOptionsFactory {
  createFireStorageModuleOptions():
    | Promise<FireStorageModuleOptions>
    | FireStorageModuleOptions;
}

// export interface FirebaseModule {
//   auth: firebaseAdmin.auth.Auth;
//   messaging: firebaseAdmin.messaging.Messaging;
//   firestore: firebaseAdmin.firestore.Firestore;
//   database?: firebaseAdmin.database.Database;
//   storage: firebaseAdmin.storage.Storage;
//   remoteConfig: firebaseAdmin.remoteConfig.RemoteConfig;
// }
