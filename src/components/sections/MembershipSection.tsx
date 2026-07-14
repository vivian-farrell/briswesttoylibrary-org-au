import Link from 'next/link'
import { TierCard } from '@/components/ui/TierCard'

type Tier = {
  name: string
  description?: string | null
  price6Month?: number | null
  price12Month?: number | null
  features?: { feature: string }[]
  isFeatured?: boolean
  ctaLabel?: string | null
}

type Trial = {
  name?: string | null
  badge?: string | null
  price?: number | null
  bondPrice?: number | null
  bondNote?: string | null
  description?: string | null
  features?: { feature: string }[]
  ctaLabel?: string | null
}

type Props = {
  heading: string
  subheading: string
  tiers: Tier[]
  trial?: Trial | null
  sectionLabel?: string
  popularBadge?: string
  disclaimer?: string
}

const FALLBACK_TIERS: Tier[] = [
  {
    name: 'Standard',
    price6Month: 75,
    price12Month: 130,
    description: 'For families',
    features: [
      { feature: 'Borrow up to 5 toys at a time' },
      { feature: 'Unlimited swaps throughout the year' },
      { feature: 'Access to all toy categories' },
    ],
    isFeatured: true,
    ctaLabel: 'Join Now',
  },
  {
    name: 'Concession',
    price6Month: 55,
    price12Month: 95,
    description: 'Pension / Health Care Card holders',
    features: [
      { feature: 'Borrow up to 5 toys at a time' },
      { feature: 'Unlimited swaps throughout the year' },
      { feature: 'Access to all toy categories' },
    ],
    isFeatured: false,
    ctaLabel: 'Join Now',
  },
]

const FALLBACK_TRIAL: Trial = {
  name: '6 Week Trial',
  price: 20,
  bondPrice: 20,
  bondNote: 'Fully refundable when toys are returned',
  description: 'Try us out before committing',
  features: [
    { feature: 'Borrow up to 5 toys at a time' },
    { feature: 'Access to all toy categories' },
  ],
  ctaLabel: 'Start Your Trial',
}

export function MembershipSection({
  heading,
  subheading,
  tiers,
  trial,
  sectionLabel = 'Membership',
  popularBadge = 'Most Popular',
  disclaimer = 'Lost or damaged toys may incur a replacement fee. See our T&Cs for details.',
}: Props) {
  const displayTiers = tiers.length > 0 ? tiers : FALLBACK_TIERS
  const displayTrial = trial ?? FALLBACK_TRIAL

  return (
    <section id="membership" className="bg-cream section-pad">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="section-label mb-3">{sectionLabel}</p>
          <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">{heading}</h2>
          <p className="text-muted text-lg max-w-xl mx-auto">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="rounded-2xl p-8 flex flex-col gap-5 bg-white text-dark shadow-md border-2 border-orange">
            <span className="text-xs font-bold uppercase tracking-widest text-white bg-orange px-3 py-1 rounded-full self-start">
              {displayTrial.badge ?? 'Try it out'}
            </span>

            <div>
              <h3 className="text-xl font-bold mb-1 text-dark">{displayTrial.name ?? '6 Week Trial'}</h3>
              {displayTrial.description && (
                <p className="text-sm text-muted">{displayTrial.description}</p>
              )}
            </div>

            <div>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black text-forest">${displayTrial.price ?? 20}</span>
                <span className="text-sm mb-2 text-muted">+ ${displayTrial.bondPrice ?? 20} bond</span>
              </div>
              {displayTrial.bondNote && (
                <p className="text-xs text-muted/70 mt-1">{displayTrial.bondNote}</p>
              )}
            </div>

            {displayTrial.features && displayTrial.features.length > 0 && (
              <ul className="flex flex-col gap-2.5">
                {displayTrial.features.map(({ feature }, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-0.5 flex-shrink-0 text-forest">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/join"
              className="mt-auto text-center font-bold py-3.5 rounded-full transition-all bg-orange text-white hover:brightness-110"
            >
              {displayTrial.ctaLabel ?? 'Start Your Trial'}
            </Link>
          </div>

          {displayTiers.map((tier, i) => (
            <TierCard key={i} tier={tier} popularBadge={popularBadge} />
          ))}
        </div>

        <p className="text-center text-muted/70 text-sm mt-8">{disclaimer}</p>
      </div>
    </section>
  )
}
