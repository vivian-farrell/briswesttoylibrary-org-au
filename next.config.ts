import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      // Vercel Blob — activated when BLOB_READ_WRITE_TOKEN is set
      { protocol: 'https', hostname: '*.public.blob.vercel.storage' },
    ],
  },
  serverExternalPackages: ['@payloadcms/db-sqlite', 'libsql', '@libsql/client'],
  experimental: {
    optimizePackageImports: ['@payloadcms/richtext-lexical'],
  },
}

export default withPayload(nextConfig)
