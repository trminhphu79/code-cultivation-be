import { CoreModule } from './module';

export const RealmPattern = Object.freeze({
  Create: `${CoreModule.Realm}/Create`,
  Update: `${CoreModule.Realm}/Update`,
  Delete: `${CoreModule.Realm}/Delete`,
  FindOne: `${CoreModule.Realm}/FindOne`,
  FindAll: `${CoreModule.Realm}/FindAll`,
});
