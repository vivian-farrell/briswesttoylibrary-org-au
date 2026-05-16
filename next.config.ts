import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  serverExternalPackages: ['@payloadcms/db-sqlite', 'libsql', '@libsql/client'],
}

export default withPayload(nextConfig)
