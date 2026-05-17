import * as migration_20260516_160141_initial from './20260516_160141_initial';

export const migrations = [
  {
    up: migration_20260516_160141_initial.up,
    down: migration_20260516_160141_initial.down,
    name: '20260516_160141_initial'
  },
];
