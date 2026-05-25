import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`hero_subtitle\` text DEFAULT 'Kenmore · Brisbane''s West · Since 1978';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`hero_subtitle\`;`)
}
