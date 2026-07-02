import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`membership_page_trial_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`membership_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`membership_page_trial_features_order_idx\` ON \`membership_page_trial_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`membership_page_trial_features_parent_id_idx\` ON \`membership_page_trial_features\` (\`_parent_id\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_membership_page_tiers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`price\` numeric,
  	\`price6_month\` numeric,
  	\`price12_month\` numeric,
  	\`description\` text,
  	\`is_featured\` integer DEFAULT false,
  	\`cta_label\` text DEFAULT 'Join Now',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`membership_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_membership_page_tiers\`("_order", "_parent_id", "id", "name", "price", "description", "is_featured", "cta_label") SELECT "_order", "_parent_id", "id", "name", "price", "description", "is_featured", "cta_label" FROM \`membership_page_tiers\`;`)
  await db.run(sql`DROP TABLE \`membership_page_tiers\`;`)
  await db.run(sql`ALTER TABLE \`__new_membership_page_tiers\` RENAME TO \`membership_page_tiers\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`membership_page_tiers_order_idx\` ON \`membership_page_tiers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`membership_page_tiers_parent_id_idx\` ON \`membership_page_tiers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_volunteer_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Volunteer With Us',
  	\`intro\` text DEFAULT 'Brisbane West Toy Library is run entirely by volunteers. Members contribute 2 shifts per year and receive 1 month of membership free — a small effort that keeps the library running for everyone.',
  	\`content\` text,
  	\`cta_label\` text DEFAULT 'Express Your Interest',
  	\`cta_email\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_volunteer_page\`("id", "heading", "intro", "content", "cta_label", "cta_email", "updated_at", "created_at") SELECT "id", "heading", "intro", "content", "cta_label", "cta_email", "updated_at", "created_at" FROM \`volunteer_page\`;`)
  await db.run(sql`DROP TABLE \`volunteer_page\`;`)
  await db.run(sql`ALTER TABLE \`__new_volunteer_page\` RENAME TO \`volunteer_page\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`setls_calendar_url\` text;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_homepage_how_it_works_section_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_how_it_works_section_steps\`("_order", "_parent_id", "id", "icon", "heading", "body") SELECT "_order", "_parent_id", "id", "icon", "heading", "body" FROM \`homepage_how_it_works_section_steps\`;`)
  await db.run(sql`DROP TABLE \`homepage_how_it_works_section_steps\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_how_it_works_section_steps\` RENAME TO \`homepage_how_it_works_section_steps\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`homepage_how_it_works_section_steps_order_idx\` ON \`homepage_how_it_works_section_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_how_it_works_section_steps_parent_id_idx\` ON \`homepage_how_it_works_section_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_how_it_works_section_steps_image_idx\` ON \`homepage_how_it_works_section_steps\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`membership_page\` ADD \`trial_name\` text DEFAULT '6 Week Trial';`)
  await db.run(sql`ALTER TABLE \`membership_page\` ADD \`trial_price\` numeric DEFAULT 20;`)
  await db.run(sql`ALTER TABLE \`membership_page\` ADD \`trial_bond_price\` numeric DEFAULT 20;`)
  await db.run(sql`ALTER TABLE \`membership_page\` ADD \`trial_bond_note\` text DEFAULT 'Fully refundable when toys are returned';`)
  await db.run(sql`ALTER TABLE \`membership_page\` ADD \`trial_description\` text;`)
  await db.run(sql`ALTER TABLE \`membership_page\` ADD \`trial_cta_label\` text DEFAULT 'Start Your Trial';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`membership_page_trial_features\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_homepage_how_it_works_section_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_how_it_works_section_steps\`("_order", "_parent_id", "id", "icon", "heading", "body") SELECT "_order", "_parent_id", "id", "icon", "heading", "body" FROM \`homepage_how_it_works_section_steps\`;`)
  await db.run(sql`DROP TABLE \`homepage_how_it_works_section_steps\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_how_it_works_section_steps\` RENAME TO \`homepage_how_it_works_section_steps\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`homepage_how_it_works_section_steps_order_idx\` ON \`homepage_how_it_works_section_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_how_it_works_section_steps_parent_id_idx\` ON \`homepage_how_it_works_section_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_membership_page_tiers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`price\` numeric NOT NULL,
  	\`description\` text,
  	\`is_featured\` integer DEFAULT false,
  	\`cta_label\` text DEFAULT 'Join Now',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`membership_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_membership_page_tiers\`("_order", "_parent_id", "id", "name", "price", "description", "is_featured", "cta_label") SELECT "_order", "_parent_id", "id", "name", "price", "description", "is_featured", "cta_label" FROM \`membership_page_tiers\`;`)
  await db.run(sql`DROP TABLE \`membership_page_tiers\`;`)
  await db.run(sql`ALTER TABLE \`__new_membership_page_tiers\` RENAME TO \`membership_page_tiers\`;`)
  await db.run(sql`CREATE INDEX \`membership_page_tiers_order_idx\` ON \`membership_page_tiers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`membership_page_tiers_parent_id_idx\` ON \`membership_page_tiers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_volunteer_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Volunteer With Us',
  	\`intro\` text DEFAULT 'Brisbane West Toy Library is run entirely by volunteers. We need a small amount of help from our members to keep the library going.',
  	\`content\` text,
  	\`cta_label\` text DEFAULT 'Express Your Interest',
  	\`cta_email\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_volunteer_page\`("id", "heading", "intro", "content", "cta_label", "cta_email", "updated_at", "created_at") SELECT "id", "heading", "intro", "content", "cta_label", "cta_email", "updated_at", "created_at" FROM \`volunteer_page\`;`)
  await db.run(sql`DROP TABLE \`volunteer_page\`;`)
  await db.run(sql`ALTER TABLE \`__new_volunteer_page\` RENAME TO \`volunteer_page\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`setls_calendar_url\`;`)
  await db.run(sql`ALTER TABLE \`membership_page\` DROP COLUMN \`trial_name\`;`)
  await db.run(sql`ALTER TABLE \`membership_page\` DROP COLUMN \`trial_price\`;`)
  await db.run(sql`ALTER TABLE \`membership_page\` DROP COLUMN \`trial_bond_price\`;`)
  await db.run(sql`ALTER TABLE \`membership_page\` DROP COLUMN \`trial_bond_note\`;`)
  await db.run(sql`ALTER TABLE \`membership_page\` DROP COLUMN \`trial_description\`;`)
  await db.run(sql`ALTER TABLE \`membership_page\` DROP COLUMN \`trial_cta_label\`;`)
}
