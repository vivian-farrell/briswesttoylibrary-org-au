import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/ui/RichText'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = await payload.findGlobal({ slug: 'membership-page' }).catch(() => null) as any
  return {
    title: `${page?.heading ?? 'Join'} | Brisbane West Toy Library`,
    description: 'Join Brisbane West Toy Library. Affordable annual membership for families in Kenmore and the western suburbs.',
  }
}

export default async function JoinPage() {
  const payload = await getPayloadClient()
  const [page, settings] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload.findGlobal({ slug: 'membership-page' }).catch(() => null) as Promise<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null) as Promise<any>,
  ])

  const heading: string = page?.heading ?? 'Join Brisbane West Toy Library'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tiers: any[] = page?.tiers ?? []
  const note: string | null = page?.note ?? null
  const intro = page?.intro ?? null
  const termsAndConditions = page?.termsAndConditions ?? null
  const email: string | null = settings?.email ?? null

  const FALLBACK_TIERS = [
    {
      name: 'Standard',
      price: 85,
      description: 'For families',
      isFeatured: true,
      ctaLabel: 'Join Now',
      features: [
        { feature: 'Borrow up to 5 toys at a time' },
        { feature: 'Unlimited swaps throughout the year' },
        { feature: 'Access to all toy categories' },
      ],
    },
    {
      name: 'Concession',
      price: 45,
      description: 'Pension / Health Care Card holders',
      isFeatured: false,
      ctaLabel: 'Join Now',
      features: [
        { feature: 'Borrow up to 5 toys at a time' },
        { feature: 'Unlimited swaps throughout the year' },
        { feature: 'Access to all toy categories' },
      ],
    },
  ]

  const display = tiers.length > 0 ? tiers : FALLBACK_TIERS

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-site section-pad">
        <div className="mb-12">
          <p className="section-label mb-3">Membership</p>
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-6">{heading}</h1>
          {intro && (
            <div className="max-w-2xl">
              <RichText data={intro} />
            </div>
          )}
          {!intro && (
            <p className="text-muted text-xl leading-relaxed max-w-xl">
              One small annual fee. Unlimited borrowing. Join the community and discover a
              smarter way to give your children an amazing play life.
            </p>
          )}
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mb-10">
          {display.map((tier: {
            name: string; price: number; description?: string | null;
            isFeatured?: boolean; ctaLabel?: string | null;
            features?: { feature: string }[]
          }, i: number) => (
            <div
              key={i}
              className={`rounded-2xl p-8 flex flex-col gap-5 ${
                tier.isFeatured
                  ? 'bg-forest text-white shadow-xl ring-2 ring-orange/60'
                  : 'bg-white text-dark shadow-md border border-mint/40'
              }`}
            >
              {tier.isFeatured && (
                <span className="text-xs font-bold uppercase tracking-widest text-orange bg-orange/15 px-3 py-1 rounded-full self-start">
                  Most Popular
                </span>
              )}
              <div>
                <h2 className={`text-xl font-bold mb-1 ${tier.isFeatured ? 'text-white' : 'text-dark'}`}>
                  {tier.name}
                </h2>
                {tier.description && (
                  <p className={`text-sm ${tier.isFeatured ? 'text-mint/80' : 'text-muted'}`}>
                    {tier.description}
                  </p>
                )}
              </div>
              <div className="flex items-end gap-1">
                <span className={`text-5xl font-black ${tier.isFeatured ? 'text-yellow' : 'text-forest'}`}>
                  ${tier.price}
                </span>
                <span className={`text-sm mb-2 ${tier.isFeatured ? 'text-mint/70' : 'text-muted'}`}>
                  /year
                </span>
              </div>
              {tier.features && tier.features.length > 0 && (
                <ul className="flex flex-col gap-2.5">
                  {tier.features.map(({ feature }, j: number) => (
                    <li key={j} className={`flex items-start gap-2 text-sm ${tier.isFeatured ? 'text-mint/90' : 'text-muted'}`}>
                      <span className="text-green mt-0.5 flex-shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              {email ? (
                <a
                  href={`mailto:${email}?subject=New%20Membership%20Enquiry`}
                  className={`mt-auto text-center font-bold py-3.5 rounded-full transition-all ${
                    tier.isFeatured
                      ? 'bg-orange text-white hover:brightness-110'
                      : 'bg-forest text-white hover:brightness-110'
                  }`}
                >
                  {tier.ctaLabel ?? 'Join Now'}
                </a>
              ) : (
                <span className={`mt-auto text-center font-bold py-3.5 rounded-full ${
                  tier.isFeatured ? 'bg-orange/50 text-white' : 'bg-forest/50 text-white'
                } cursor-default`}>
                  {tier.ctaLabel ?? 'Join Now'}
                </span>
              )}
            </div>
          ))}
        </div>

        {note && (
          <p className="text-muted/70 text-sm mb-10 max-w-2xl">{note}</p>
        )}

        {/* How to join */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-mint/30 max-w-2xl mb-10">
          <h2 className="text-xl font-bold text-dark mb-5">How to Join</h2>
          <ol className="flex flex-col gap-4">
            {[
              { step: '1', text: `Contact us by email${email ? ` at ${email}` : ''} to express your interest.` },
              { step: '2', text: 'Pay the annual membership fee (cash or bank transfer accepted at sessions).' },
              { step: '3', text: 'Come along to a session and start borrowing!' },
            ].map(({ step, text }) => (
              <li key={step} className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-forest text-white font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step}
                </span>
                <p className="text-muted leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>

        {termsAndConditions && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-dark mb-4">Terms & Conditions</h2>
            <RichText data={termsAndConditions} />
          </div>
        )}
      </div>
    </div>
  )
}
