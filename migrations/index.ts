import * as migration_20260516_160141_initial from './20260516_160141_initial';
import * as migration_20260517_091247_phase4_about_volunteer_pages from './20260517_091247_phase4_about_volunteer_pages';
import * as migration_20260517_124938_drop_about_page_global from './20260517_124938_drop_about_page_global';
import * as migration_20260523_150446_add_coming_soon from './20260523_150446_add_coming_soon';
import * as migration_20260525_133944_add_hero_subtitle from './20260525_133944_add_hero_subtitle';
import * as migration_20260525_134850_location_section_address_hours from './20260525_134850_location_section_address_hours';
import * as migration_20260531_123635_cms_all_section_labels from './20260531_123635_cms_all_section_labels';
import * as migration_20260603_112249_add_faq_section from './20260603_112249_add_faq_section';
import * as migration_20260702_133334_redesign_about_howitworks_membership_volunteer from './20260702_133334_redesign_about_howitworks_membership_volunteer';
import * as migration_20260714_124358_audit_cleanup_rewire from './20260714_124358_audit_cleanup_rewire';

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
    name: '20260523_150446_add_coming_soon',
  },
  {
    up: migration_20260525_133944_add_hero_subtitle.up,
    down: migration_20260525_133944_add_hero_subtitle.down,
    name: '20260525_133944_add_hero_subtitle',
  },
  {
    up: migration_20260525_134850_location_section_address_hours.up,
    down: migration_20260525_134850_location_section_address_hours.down,
    name: '20260525_134850_location_section_address_hours',
  },
  {
    up: migration_20260531_123635_cms_all_section_labels.up,
    down: migration_20260531_123635_cms_all_section_labels.down,
    name: '20260531_123635_cms_all_section_labels',
  },
  {
    up: migration_20260603_112249_add_faq_section.up,
    down: migration_20260603_112249_add_faq_section.down,
    name: '20260603_112249_add_faq_section',
  },
  {
    up: migration_20260702_133334_redesign_about_howitworks_membership_volunteer.up,
    down: migration_20260702_133334_redesign_about_howitworks_membership_volunteer.down,
    name: '20260702_133334_redesign_about_howitworks_membership_volunteer',
  },
  {
    up: migration_20260714_124358_audit_cleanup_rewire.up,
    down: migration_20260714_124358_audit_cleanup_rewire.down,
    name: '20260714_124358_audit_cleanup_rewire'
  },
];
