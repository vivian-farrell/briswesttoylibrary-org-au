import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/faq', destination: '/#faq', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'placekitten.com' },
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
