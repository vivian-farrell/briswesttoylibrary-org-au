import * as migration_20260516_160141_initial from './20260516_160141_initial';
import * as migration_20260517_091247_phase4_about_volunteer_pages from './20260517_091247_phase4_about_volunteer_pages';
import * as migration_20260517_124938_drop_about_page_global from './20260517_124938_drop_about_page_global';
import * as migration_20260523_150446_add_coming_soon from './20260523_150446_add_coming_soon';

export const migrations = [
  {
    up: migration_20260516_160141_initial.up,
    down: migration_20260516_160141_initial.down,
    name: '20260516_160141_initial',
  },
  {
    up: migration_20260517_091247_phase4_about_volunteer_pages.up,
    down: migration_20260517_091247_phase4_about_volunteer_pages.down,
    name: '20260517_091247_phase4_about_volunteer_pages',
  },
  {
    up: migration_20260517_124938_drop_about_page_global.up,
    down: migration_20260517_124938_drop_about_page_global.down,
    name: '20260517_124938_drop_about_page_global',
  },
  {
    up: migration_20260523_150446_add_coming_soon.up,
    down: migration_20260523_150446_add_coming_soon.down,
    name: '20260523_150446_add_coming_soon'
  },
];
