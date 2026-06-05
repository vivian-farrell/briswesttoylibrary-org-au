import Link from 'next/link'

type Post = {
  title: string
  slug: string
  excerpt?: string | null
  publishedAt?: string | null
  category?: string | null
}

type Props = {
  posts: Post[]
  sectionLabel?: string
  heading?: string
  allNewsLabel?: string
}

export function NewsPreview({ posts, sectionLabel = 'Latest News', heading = "What's On", allNewsLabel = 'All news →' }: Props) {
  if (posts.length === 0) return null

  return (
    <section id="news" className="bg-white section-pad">
      <div className="container-site">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-dark">{heading}</h2>
          </div>
          <Link
            href="/news"
            className="text-forest font-semibold hover:text-green transition-colors hidden sm:block"
          >
            {allNewsLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="group block bg-cream rounded-2xl p-6 border border-mint/20 hover:border-mint hover:shadow-md transition-all"
            >
              {post.category && (
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-green bg-mint/30 px-2.5 py-1 rounded-full mb-4">
                  {post.category}
                </span>
              )}
              <h3 className="font-bold text-dark text-lg mb-3 group-hover:text-forest transition-colors leading-snug">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-muted text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
              )}
              {post.publishedAt && (
                <p className="text-xs text-muted/60 mt-4">
                  {new Date(post.publishedAt).toLocaleDateString('en-AU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/news" className="text-forest font-semibold hover:text-green">
            {allNewsLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
