import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/ui/RichText'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = await payload.findGlobal({ slug: 'membership-page' }).catch(() => null) as any
  return {
    title: page?.heading ?? 'Join Brisbane West Toy Library',
    description: 'Sign up to become a member of Brisbane West Toy Library.',
  }
}

export default async function JoinPage() {
  const payload = await getPayloadClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = await payload.findGlobal({ slug: 'membership-page' }).catch(() => null) as any

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-site section-pad">
        <div className="max-w-xl">
          <p className="section-label mb-3">{page?.sectionLabel ?? 'Membership'}</p>
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">
            {page?.heading ?? 'Join Brisbane West Toy Library'}
          </h1>
          {page?.intro ? (
            <div className="mb-10">
              <RichText data={page.intro} />
            </div>
          ) : (
            <p className="text-muted text-lg leading-relaxed mb-10">
              Online joining is coming soon. In the meantime, come along to a session or
              get in touch and we&apos;ll get you set up.
            </p>
          )}

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-mint/30 flex flex-col gap-6">
            <p className="text-muted/60 text-sm uppercase tracking-widest font-semibold">
              Join form — coming soon
            </p>
            <div className="h-40 rounded-xl bg-cream border-2 border-dashed border-mint/40 flex items-center justify-center">
              <p className="text-muted/50 text-sm">Form fields to be determined</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/#membership"
              className="inline-block bg-forest text-white font-bold px-7 py-3.5 rounded-full hover:brightness-110 transition-all text-center"
            >
              ← View membership options
            </Link>
            <Link
              href="/#contact"
              className="inline-block bg-white text-forest font-bold px-7 py-3.5 rounded-full border-2 border-forest/30 hover:bg-forest/5 transition-all text-center"
            >
              Contact us instead
            </Link>
          </div>

          {page?.note && (
            <p className="text-muted/70 text-sm mt-10">{page.note}</p>
          )}

          {page?.termsAndConditions && (
            <div className="mt-10 pt-8 border-t border-mint/30">
              <RichText data={page.termsAndConditions} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
