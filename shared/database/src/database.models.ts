import { Account } from '@shared/models/account';
import { Achievement } from '@shared/models/achievement';
import { MaterialArt } from '@shared/models/material-art';
import { Profile } from '@shared/models/profile';
import { ProfileAchievement } from '@shared/models/profile-achievement';
import { ProfileMaterialArt } from '@shared/models/profile-material-art';
import { Realm } from '@shared/models/realm';
import { Sect } from '@shared/models/sect';
import { ProfileSocial } from 'shared/models/src/profile-social.model';
import { Social } from 'shared/models/src/social.model';

export const DatabaseModels = [
  Account,
  Profile,
  Realm,
  MaterialArt,
  Achievement,
  Sect,
  ProfileAchievement,
  ProfileMaterialArt,
  ProfileSocial,
  Social,
];
