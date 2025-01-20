import { AccountModule } from './module';

export const ProfileMsgPattern = Object.freeze({
  UpdateExp: `${AccountModule.Profile}/UpdateExp`,
  UpdateStreak: `${AccountModule.Profile}/UpdateStreak`,
  UpdateRealm: `${AccountModule.Profile}/UpdateRealm`,

  UpdatePersonal: `${AccountModule.Profile}/UpdatePersonal`,
  Deactivate: `${AccountModule.Profile}/Deactivate`,
  Delete: `${AccountModule.Profile}/Delete`,
  ChangePassword: `${AccountModule.Profile}/ChangePassword`,
  ListAccount: `${AccountModule.Profile}/ListAccount`,

  AddAchivement: `${AccountModule.Profile}/AddAchivement`,
  RemoveAchivement: `${AccountModule.Profile}/RemoveAchivement`,

  AddMaterialArt: `${AccountModule.Profile}/AddMaterialArt`,
  RemoveMaterialArt: `${AccountModule.Profile}/RemoveMaterialArt`,

  GetAllRelatedInfoProfile: `${AccountModule.Profile}/GetAllRelatedInfoProfile`,


  GetSocialProfile: `${AccountModule.Profile}/GetSocialProfile`,
  AddSocialProfile: `${AccountModule.Profile}/AddSocialProfile`,
  UpdateSocialProfile: `${AccountModule.Profile}/UpdateSocialProfile`,
  DeleteSocialProfile: `${AccountModule.Profile}/DeleteSocialProfile`,
});
