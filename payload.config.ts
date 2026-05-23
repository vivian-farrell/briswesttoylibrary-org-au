import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

import { Users } from './src/collections/Users.ts'
import { Media } from './src/collections/Media.ts'
import { Posts } from './src/collections/Posts.ts'
import { FAQs } from './src/collections/FAQs.ts'
import { Toys } from './src/collections/Toys.ts'

import { SiteSettings } from './src/globals/SiteSettings.ts'
import { Navigation } from './src/globals/Navigation.ts'
import { Footer } from './src/globals/Footer.ts'
import { Homepage } from './src/globals/Homepage.ts'
import { MembershipPage } from './src/globals/MembershipPage.ts'
import { ContactPage } from './src/globals/ContactPage.ts'
import { VolunteerPage } from './src/globals/VolunteerPage.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, FAQs, Toys],
  globals: [SiteSettings, Navigation, Footer, Homepage, MembershipPage, ContactPage, VolunteerPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload.db',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      uploadsCollection: 'media',
      generateTitle: ({ doc }) =>
        `${doc?.title ? `${doc.title} | ` : ''}Brisbane West Toy Library`,
      generateDescription: ({ doc }) => (doc?.excerpt as string) ?? '',
    }),
    // Vercel Blob — only active when BLOB_READ_WRITE_TOKEN env var is set.
    // In Vercel: Storage → Create → Blob store → copy token to env vars.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? '',
    }),
  ],
})
