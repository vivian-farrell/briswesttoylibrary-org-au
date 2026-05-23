import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/ui/RichText'

export const revalidate = 3600

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

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload
    .find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
    .catch(() => ({ docs: [] }))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post = (result as any).docs?.[0]
  if (!post) return { title: 'Post Not Found | Brisbane West Toy Library' }
  return {
    title: `${post.title} | Brisbane West Toy Library`,
    description: post.excerpt ?? undefined,
  }
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const result = await payload
    .find({ collection: 'posts', where: { status: { equals: 'published' } }, limit: 100 })
    .catch(() => ({ docs: [] }))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((result as any).docs ?? []).map((p: any) => ({ slug: p.slug as string }))
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload
    .find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
    .catch(() => ({ docs: [] }))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post = (result as any).docs?.[0]
  if (!post || post.status !== 'published') notFound()

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-site section-pad">
        <Link href="/news" className="text-forest text-sm font-semibold hover:underline mb-8 inline-block">
          ← Back to News
        </Link>

        <article className="max-w-2xl">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            {post.category && (
              <span className="text-xs font-bold uppercase tracking-wider text-forest bg-mint/25 px-2.5 py-1 rounded-full">
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
            )}
            {post.publishedAt && (
              <span className="text-sm text-muted">{formatDate(post.publishedAt as string)}</span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-dark mb-6 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-muted text-xl leading-relaxed mb-8 border-l-4 border-mint pl-5">
              {post.excerpt}
            </p>
          )}

          {post.featuredImage?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.featuredImage.url as string}
              alt={post.featuredImage.alt ?? post.title}
              className="w-full rounded-2xl mb-8 object-cover max-h-96"
            />
          )}

          {post.content && <RichText data={post.content} />}
        </article>
      </div>
    </div>
  )
}
