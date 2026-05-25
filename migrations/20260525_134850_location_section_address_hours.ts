import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`homepage_location_section_opening_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` text NOT NULL,
  	\`hours\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_location_section_opening_hours_order_idx\` ON \`homepage_location_section_opening_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_location_section_opening_hours_parent_id_idx\` ON \`homepage_location_section_opening_hours\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`location_section_street\` text DEFAULT '8 Brookfield Road';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`location_section_suburb\` text DEFAULT 'Kenmore';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`location_section_state\` text DEFAULT 'QLD';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`location_section_postcode\` text DEFAULT '4069';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`homepage_location_section_opening_hours\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`location_section_street\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`location_section_suburb\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`location_section_state\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`location_section_postcode\`;`)
}
