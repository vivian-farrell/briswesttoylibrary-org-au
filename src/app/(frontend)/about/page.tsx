import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/ui/RichText'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = await payload.findGlobal({ slug: 'about-page' }).catch(() => null) as any
  return {
    title: `${page?.heading ?? 'About Us'} | Brisbane West Toy Library`,
    description: page?.intro ?? 'Learn about Brisbane West Toy Library — a community toy library in Kenmore, Brisbane.',
  }
}

export default async function AboutPage() {
  const payload = await getPayloadClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = await payload.findGlobal({ slug: 'about-page' }).catch(() => null) as any

  const heading: string = page?.heading ?? 'About Brisbane West Toy Library'
  const intro: string | null = page?.intro ?? null
  const content = page?.content ?? null

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-site section-pad">
        <div className="max-w-2xl">
          <p className="section-label mb-3">About Us</p>
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-6">{heading}</h1>
          {intro && (
            <p className="text-muted text-xl leading-relaxed mb-8">{intro}</p>
          )}
        </div>

        {content && (
          <div className="max-w-2xl">
            <RichText data={content} />
          </div>
        )}

        {!content && (
          <div className="max-w-2xl space-y-6 text-muted leading-relaxed">
            <p>
              Brisbane West Toy Library is a community-run toy library serving families across
              the western suburbs of Brisbane, based in Kenmore. We are a non-profit association
              run entirely by volunteers.
            </p>
            <p>
              Our library stocks hundreds of quality educational toys, puzzles, games, books, and
              outdoor equipment. Members pay a small annual fee and can borrow toys throughout the
              year, returning them when their child is ready for something new.
            </p>
            <p>
              We believe that children benefit from a wide variety of play experiences, and that
              families shouldn&apos;t have to buy every toy they want to explore. Toy libraries
              reduce waste, save money, and build community — and we&apos;re proud to be part of
              the Brisbane West community.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
