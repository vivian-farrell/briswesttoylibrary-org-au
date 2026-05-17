import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://briswesttoylibrary.org.au'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${base}/toys`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/join`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/news`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${base}/faq`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/volunteer`, priority: 0.6, changeFrequency: 'monthly' },
  ]

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 200,
    })
    const postRoutes: MetadataRoute.Sitemap = result.docs.map((post) => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      url: `${base}/news/${(post as any).slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
    return [...staticRoutes, ...postRoutes]
  } catch {
    return staticRoutes
  }
}
