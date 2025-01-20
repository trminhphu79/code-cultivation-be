import { MicroServiceName } from '../';

export const ActivityPattern = Object.freeze({
  UpdateExperience: `${MicroServiceName.Activity}/UpdateExperience`,
});

export const ActivitySocket = Object.freeze({
  ProfileAddExperience: 'PROFILE_ADD_EXPERIENCE',
  ProfileUpgradeLevel: 'PROFILE_UPGRADE_LEVEL',
  UserPingOnline: 'USER_PING_ONLINE',
});
