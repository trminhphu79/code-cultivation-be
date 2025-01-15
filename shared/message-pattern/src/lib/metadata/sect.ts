import { CoreModule } from './module';

export const SectPattern = Object.freeze({
  Create: `${CoreModule.Sect}/Create`,
  Update: `${CoreModule.Sect}/Update`,
  Delete: `${CoreModule.Sect}/Delete`,
  FindOne: `${CoreModule.Sect}/FindOne`,
  FindAll: `${CoreModule.Sect}/FindAll`,
});
