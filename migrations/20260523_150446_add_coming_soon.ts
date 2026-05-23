import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_homepage\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_type\` text DEFAULT 'carousel' NOT NULL,
  	\`hero_video_id\` integer,
  	\`hero_headline\` text DEFAULT 'Toys. Imagination. Community.',
  	\`hero_tagline\` text DEFAULT 'Borrow quality toys for your child''s world — sustainably, affordably, together.',
  	\`hero_c_t_a_label\` text DEFAULT 'Join Now',
  	\`hero_c_t_a_href\` text DEFAULT '/#membership',
  	\`location_section_heading\` text DEFAULT 'We''re in Kenmore',
  	\`location_section_map_embed_url\` text,
  	\`location_section_directions_url\` text,
  	\`about_section_heading\` text DEFAULT 'More toys. Less clutter. More community.',
  	\`about_section_body\` text DEFAULT 'A toy library is exactly what it sounds like — a library for toys. Members pay a small annual fee and borrow quality educational toys, puzzles, games, and outdoor equipment, returning them when their child is ready for something new.',
  	\`about_section_image_id\` integer,
  	\`membership_section_heading\` text DEFAULT 'Simple, affordable membership',
  	\`membership_section_subheading\` text DEFAULT 'One annual fee. Unlimited borrowing. No hidden costs. Concession rates available.',
  	\`contact_section_heading\` text DEFAULT 'We''d love to hear from you',
  	\`contact_section_intro\` text DEFAULT 'Questions about membership, toys, or volunteering? Drop us a line.',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_section_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage\`("id", "hero_type", "hero_video_id", "hero_headline", "hero_tagline", "hero_c_t_a_label", "hero_c_t_a_href", "location_section_heading", "location_section_map_embed_url", "location_section_directions_url", "about_section_heading", "about_section_body", "about_section_image_id", "membership_section_heading", "membership_section_subheading", "contact_section_heading", "contact_section_intro", "updated_at", "created_at") SELECT "id", "hero_type", "hero_video_id", "hero_headline", "hero_tagline", "hero_c_t_a_label", "hero_c_t_a_href", "location_section_heading", "location_section_map_embed_url", "location_section_directions_url", "about_section_heading", "about_section_body", "about_section_image_id", "membership_section_heading", "membership_section_subheading", "contact_section_heading", "contact_section_intro", "updated_at", "created_at" FROM \`homepage\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage\` RENAME TO \`homepage\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`homepage_hero_video_idx\` ON \`homepage\` (\`hero_video_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_about_section_about_section_image_idx\` ON \`homepage\` (\`about_section_image_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`coming_soon\` integer DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_homepage\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_type\` text DEFAULT 'carousel' NOT NULL,
  	\`hero_video_id\` integer,
  	\`hero_headline\` text DEFAULT 'Toys. Imagination. Community.',
  	\`hero_tagline\` text DEFAULT 'Borrow quality toys for your child''s world — sustainably, affordably, together.',
  	\`hero_c_t_a_label\` text DEFAULT 'Join Now',
  	\`hero_c_t_a_href\` text DEFAULT '/join',
  	\`location_section_heading\` text DEFAULT 'We''re in Kenmore',
  	\`location_section_map_embed_url\` text,
  	\`location_section_directions_url\` text,
  	\`about_section_heading\` text DEFAULT 'More toys. Less clutter. More community.',
  	\`about_section_body\` text DEFAULT 'A toy library is exactly what it sounds like — a library for toys. Members pay a small annual fee and borrow quality educational toys, puzzles, games, and outdoor equipment, returning them when their child is ready for something new.',
  	\`about_section_image_id\` integer,
  	\`membership_section_heading\` text DEFAULT 'Simple, affordable membership',
  	\`membership_section_subheading\` text DEFAULT 'One annual fee. Unlimited borrowing. No hidden costs. Concession rates available.',
  	\`contact_section_heading\` text DEFAULT 'We''d love to hear from you',
  	\`contact_section_intro\` text DEFAULT 'Questions about membership, toys, or volunteering? Drop us a line.',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_section_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage\`("id", "hero_type", "hero_video_id", "hero_headline", "hero_tagline", "hero_c_t_a_label", "hero_c_t_a_href", "location_section_heading", "location_section_map_embed_url", "location_section_directions_url", "about_section_heading", "about_section_body", "about_section_image_id", "membership_section_heading", "membership_section_subheading", "contact_section_heading", "contact_section_intro", "updated_at", "created_at") SELECT "id", "hero_type", "hero_video_id", "hero_headline", "hero_tagline", "hero_c_t_a_label", "hero_c_t_a_href", "location_section_heading", "location_section_map_embed_url", "location_section_directions_url", "about_section_heading", "about_section_body", "about_section_image_id", "membership_section_heading", "membership_section_subheading", "contact_section_heading", "contact_section_intro", "updated_at", "created_at" FROM \`homepage\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage\` RENAME TO \`homepage\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`homepage_hero_video_idx\` ON \`homepage\` (\`hero_video_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_about_section_about_section_image_idx\` ON \`homepage\` (\`about_section_image_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`coming_soon\`;`)
}
