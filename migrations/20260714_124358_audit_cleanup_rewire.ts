import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`toys_page_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`toys_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`toys_page_features_order_idx\` ON \`toys_page_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`toys_page_features_parent_id_idx\` ON \`toys_page_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`toys_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text DEFAULT 'Toy Catalogue',
  	\`heading\` text DEFAULT 'Our Toys',
  	\`intro\` text DEFAULT 'We stock hundreds of quality educational toys, puzzles, games, and outdoor equipment — updated regularly with new additions.',
  	\`catalogue_card_heading\` text DEFAULT 'Browse the Catalogue',
  	\`catalogue_card_body\` text DEFAULT 'Our full toy catalogue is hosted on SETLS, the platform we use to manage borrowing. Members can log in to place reservations.',
  	\`catalogue_cta_label\` text DEFAULT 'Open Toy Catalogue →',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`news_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text DEFAULT 'Latest',
  	\`heading\` text DEFAULT 'News & Announcements',
  	\`empty_state_text\` text DEFAULT 'No posts yet — check back soon!',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`contact_section_form_enabled\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`membership_page\` ADD \`section_label\` text DEFAULT 'Membership';`)
  await db.run(sql`ALTER TABLE \`membership_page\` ADD \`trial_badge\` text DEFAULT 'Try it out';`)
  await db.run(sql`ALTER TABLE \`volunteer_page\` ADD \`section_label\` text DEFAULT 'Volunteering';`)
  await db.run(sql`ALTER TABLE \`volunteer_page\` ADD \`roles_heading\` text DEFAULT 'Volunteer Roles';`)
  await db.run(sql`ALTER TABLE \`volunteer_page\` ADD \`calendar_label\` text DEFAULT 'View Volunteer Shift Calendar →';`)
  // NOTE: Deploy 1 of 2 — intentionally additive-only (see CLAUDE.md schema convention).
  // The drops for fields removed from the Payload config in this commit
  // (site_settings address_* + opening-hours table, contact_page table,
  //  homepage.membership_section_price_suffix, navigation_items.is_scroll_link,
  //  homepage_how_it_works_section_steps.icon, membership_page_tiers.price)
  // ship in a follow-up drop-only migration once this deploy is verified live.
  // Until then the orphaned columns/tables remain in the DB and are ignored.
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`toys_page_features\`;`)
  await db.run(sql`DROP TABLE \`toys_page\`;`)
  await db.run(sql`DROP TABLE \`news_page\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`contact_section_form_enabled\`;`)
  await db.run(sql`ALTER TABLE \`membership_page\` DROP COLUMN \`section_label\`;`)
  await db.run(sql`ALTER TABLE \`membership_page\` DROP COLUMN \`trial_badge\`;`)
  await db.run(sql`ALTER TABLE \`volunteer_page\` DROP COLUMN \`section_label\`;`)
  await db.run(sql`ALTER TABLE \`volunteer_page\` DROP COLUMN \`roles_heading\`;`)
  await db.run(sql`ALTER TABLE \`volunteer_page\` DROP COLUMN \`calendar_label\`;`)
}
