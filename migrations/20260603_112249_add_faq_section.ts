import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`faq_section_section_label\` text DEFAULT 'Help';`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`faq_section_heading\` text DEFAULT 'Frequently Asked Questions';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`faq_section_section_label\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`faq_section_heading\`;`)
}
