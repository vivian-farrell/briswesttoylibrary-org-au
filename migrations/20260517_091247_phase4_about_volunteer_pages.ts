import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`about_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'About Brisbane West Toy Library',
  	\`intro\` text DEFAULT 'Brisbane West Toy Library is a community-run toy library in Kenmore, Brisbane, serving families across the western suburbs.',
  	\`content\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`volunteer_page_roles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`commitment\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`volunteer_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`volunteer_page_roles_order_idx\` ON \`volunteer_page_roles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`volunteer_page_roles_parent_id_idx\` ON \`volunteer_page_roles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`volunteer_page\` (
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
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`about_page\`;`)
  await db.run(sql`DROP TABLE \`volunteer_page_roles\`;`)
  await db.run(sql`DROP TABLE \`volunteer_page\`;`)
}
