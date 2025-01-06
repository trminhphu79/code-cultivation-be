import { Account } from '@shared/models/account';
import { Achievement } from '@shared/models/achievement';
import { MaterialArt } from '@shared/models/material-art';
import { Profile } from '@shared/models/profile';
import { ProfileAchievement } from '@shared/models/profile-achievement';
import { ProfileMaterialArt } from '@shared/models/profile-material-art';
import { Realm } from '@shared/models/realm';
import { Sect } from '@shared/models/sect';

export const DatabaseModels = [
  Account,
  Profile,
  Realm,
  MaterialArt,
  Achievement,
  Sect,
  ProfileAchievement,
  ProfileMaterialArt,
];
