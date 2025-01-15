import { CoreModule } from './module';

export const AchievementPattern = Object.freeze({
  Create: `${CoreModule.Achievement}/Create`,
  Update: `${CoreModule.Achievement}/Update`,
  Delete: `${CoreModule.Achievement}/Delete`,
  FindOne: `${CoreModule.Achievement}/FindOne`,
  FindAll: `${CoreModule.Achievement}/FindAll`,
});
