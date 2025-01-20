import { MicroServiceName } from '..';

export const GuildModule = Object.freeze({
  Member: `${MicroServiceName.Guild}/Member`,
  General: `${MicroServiceName.Guild}/General`,
});
