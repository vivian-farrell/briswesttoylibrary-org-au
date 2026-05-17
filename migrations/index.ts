import * as migration_20260516_160141_initial from './20260516_160141_initial';
import * as migration_20260517_091247_phase4_about_volunteer_pages from './20260517_091247_phase4_about_volunteer_pages';

export const migrations = [
  {
    up: migration_20260516_160141_initial.up,
    down: migration_20260516_160141_initial.down,
    name: '20260516_160141_initial',
  },
  {
    up: migration_20260517_091247_phase4_about_volunteer_pages.up,
    down: migration_20260517_091247_phase4_about_volunteer_pages.down,
    name: '20260517_091247_phase4_about_volunteer_pages'
  },
];
