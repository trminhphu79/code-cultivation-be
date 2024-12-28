import { MicroServiceName } from '..';

export const AccountModule = Object.freeze({
  Auth: `${MicroServiceName.Account}/Auth`,
  Profile: `${MicroServiceName.Account}/Profile`,
});
