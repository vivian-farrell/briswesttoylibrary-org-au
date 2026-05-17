import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`about_page\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`about_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'About Brisbane West Toy Library',
  	\`intro\` text DEFAULT 'Brisbane West Toy Library is a community-run toy library in Kenmore, Brisbane, serving families across the western suburbs.',
  	\`content\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}
