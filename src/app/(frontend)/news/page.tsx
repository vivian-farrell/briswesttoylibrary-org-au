import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'News | Brisbane West Toy Library',
  description: 'The latest news, events, and announcements from Brisbane West Toy Library.',
}

const CATEGORY_LABELS: Record<string, string> = {
  news: 'News',
  event: 'Event',
  volunteer: 'Volunteer',
  announcement: 'Announcement',
}

function formatDate(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function NewsPage() {
  const payload = await getPayloadClient()
  const result = await payload
    .find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 20,
    })
    .catch(() => ({ docs: [] }))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = (result as any).docs ?? []

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-site section-pad">
        <div className="mb-12">
          <p className="section-label mb-3">Latest</p>
          <h1 className="text-4xl md:text-5xl font-black text-dark">News & Announcements</h1>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted text-lg">No posts yet — check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {posts.map((post: any) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-mint/20 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
              >
                {post.featuredImage?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.featuredImage.url as string}
                    alt={post.featuredImage.alt ?? post.title}
                    className="w-full h-44 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.category && (
                      <span className="text-xs font-bold uppercase tracking-wider text-forest bg-mint/25 px-2.5 py-1 rounded-full">
                        {CATEGORY_LABELS[post.category] ?? post.category}
                      </span>
                    )}
                    {post.publishedAt && (
                      <span className="text-xs text-muted">{formatDate(post.publishedAt)}</span>
                    )}
                  </div>
                  <h2 className="font-bold text-dark text-lg leading-snug">{post.title}</h2>
                  {post.excerpt && (
                    <p className="text-muted text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  )}
                  <p className="text-forest text-sm font-semibold mt-auto">Read more →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
