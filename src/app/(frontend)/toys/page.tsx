import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = await payload.findGlobal({ slug: 'toys-page' }).catch(() => null) as any
  return {
    title: page?.heading ?? 'Our Toys',
    description:
      page?.intro ??
      'Browse the Brisbane West Toy Library catalogue and borrow quality educational toys for your children.',
  }
}

type Feature = { icon: string; title: string; body: string }

const FALLBACK_FEATURES: Feature[] = [
  { icon: '🎯', title: 'Educational', body: 'Puzzles, building sets, STEM kits and more' },
  { icon: '🌿', title: 'Sustainable', body: 'Borrow instead of buy — less waste, more variety' },
  { icon: '♻️', title: 'Always Rotating', body: 'Return when done and try something new' },
]

export default async function ToysPage() {
  const payload = await getPayloadClient()
  const [page, settings] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload.findGlobal({ slug: 'toys-page' }).catch(() => null) as Promise<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null) as Promise<any>,
  ])

  const catalogueUrl: string | null = settings?.setlsCatalogueUrl ?? null
  const features: Feature[] =
    page?.features && page.features.length > 0 ? page.features : FALLBACK_FEATURES

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-site section-pad">
        <div className="mb-12">
          <p className="section-label mb-3">{page?.sectionLabel ?? 'Toy Catalogue'}</p>
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">{page?.heading ?? 'Our Toys'}</h1>
          <p className="text-muted text-lg max-w-xl">
            {page?.intro ??
              'We stock hundreds of quality educational toys, puzzles, games, and outdoor equipment — updated regularly with new additions.'}
          </p>
        </div>

        {catalogueUrl ? (
          <div className="bg-white rounded-2xl p-10 shadow-md border border-mint/30 max-w-2xl flex flex-col gap-6">
            <div className="w-16 h-16 rounded-2xl bg-forest/10 flex items-center justify-center text-3xl">
              🧸
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark mb-2">
                {page?.catalogueCardHeading ?? 'Browse the Catalogue'}
              </h2>
              <p className="text-muted leading-relaxed">
                {page?.catalogueCardBody ??
                  'Our full toy catalogue is hosted on SETLS, the platform we use to manage borrowing. Members can log in to place reservations.'}
              </p>
            </div>
            <a
              href={catalogueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange text-white font-bold px-8 py-4 rounded-full hover:brightness-110 transition-all self-start"
            >
              {page?.catalogueCtaLabel ?? 'Open Toy Catalogue →'}
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 shadow-md border border-mint/30 max-w-2xl flex flex-col gap-4">
            <div className="w-16 h-16 rounded-2xl bg-forest/10 flex items-center justify-center text-3xl">
              🧸
            </div>
            <p className="text-muted text-lg">
              Our online catalogue is coming soon. In the meantime, come along to a session to see what&apos;s available!
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-forest text-white font-bold px-8 py-4 rounded-full hover:brightness-110 transition-all self-start"
            >
              Contact Us →
            </Link>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon, title, body }) => (
            <div key={title} className="bg-white rounded-xl p-6 shadow-sm border border-mint/20 flex gap-4">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <p className="font-bold text-dark">{title}</p>
                <p className="text-muted text-sm mt-1">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
