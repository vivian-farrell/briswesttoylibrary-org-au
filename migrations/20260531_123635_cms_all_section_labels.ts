import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`homepage_about_section_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_about_section_features_order_idx\` ON \`homepage_about_section_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_about_section_features_parent_id_idx\` ON \`homepage_about_section_features\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`about_text\` text DEFAULT 'A community toy library serving Kenmore and Brisbane''s west since 1978. Not-for-profit, volunteer-run, and proud of it.';`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`explore_column_heading\` text DEFAULT 'Explore';`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`involved_column_heading\` text DEFAULT 'Get Involved';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`scroll_label\` text DEFAULT 'Scroll';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`location_section_section_label\` text DEFAULT 'Find Us';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`location_section_opening_hours_label\` text DEFAULT 'Opening Hours';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`location_section_directions_label\` text DEFAULT 'Get Directions →';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`location_section_maps_label\` text DEFAULT 'View on Google Maps';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`about_section_section_label\` text DEFAULT 'About';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`how_it_works_section_section_label\` text DEFAULT 'Simple Process';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`how_it_works_section_heading\` text DEFAULT 'How It Works';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`news_section_section_label\` text DEFAULT 'Latest News';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`news_section_heading\` text DEFAULT 'What''s On';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`news_section_all_news_label\` text DEFAULT 'All news →';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`membership_section_section_label\` text DEFAULT 'Membership';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`membership_section_popular_badge\` text DEFAULT 'Most Popular';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`membership_section_price_suffix\` text DEFAULT '/year';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`membership_section_disclaimer\` text DEFAULT 'Lost or damaged toys may incur a replacement fee. See our T&Cs for details.';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`contact_section_section_label\` text DEFAULT 'Get In Touch';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`contact_section_form_heading\` text DEFAULT 'Send us a message';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`homepage_about_section_features\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`about_text\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`explore_column_heading\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`involved_column_heading\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`scroll_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`location_section_section_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`location_section_opening_hours_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`location_section_directions_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`location_section_maps_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`about_section_section_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`how_it_works_section_section_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`how_it_works_section_heading\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`news_section_section_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`news_section_heading\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`news_section_all_news_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`membership_section_section_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`membership_section_popular_badge\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`membership_section_price_suffix\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`membership_section_disclaimer\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`contact_section_section_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`contact_section_form_heading\`;`)
}
