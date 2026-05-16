import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'

import { Users } from './src/collections/Users.js'
import { Media } from './src/collections/Media.js'
import { Posts } from './src/collections/Posts.js'
import { FAQs } from './src/collections/FAQs.js'
import { Toys } from './src/collections/Toys.js'

import { SiteSettings } from './src/globals/SiteSettings.js'
import { Navigation } from './src/globals/Navigation.js'
import { Footer } from './src/globals/Footer.js'
import { Homepage } from './src/globals/Homepage.js'
import { MembershipPage } from './src/globals/MembershipPage.js'
import { ContactPage } from './src/globals/ContactPage.js'

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
  globals: [SiteSettings, Navigation, Footer, Homepage, MembershipPage, ContactPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload.db',
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
  ],
})
