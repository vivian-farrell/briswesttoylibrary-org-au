import Link from 'next/link'

type Tier = {
  name: string
  price: number
  description?: string | null
  features?: { feature: string }[]
  isFeatured?: boolean
  ctaLabel?: string | null
}

type Props = {
  heading: string
  subheading: string
  tiers: Tier[]
}

const FALLBACK_TIERS: Tier[] = [
  {
    name: 'Standard',
    price: 85,
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
    price: 45,
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

export function MembershipSection({ heading, subheading, tiers }: Props) {
  const display = tiers.length > 0 ? tiers : FALLBACK_TIERS

  return (
    <section id="membership" className="bg-cream section-pad">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Membership</p>
          <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">{heading}</h2>
          <p className="text-muted text-lg max-w-xl mx-auto">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {display.map((tier, i) => (
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
                <h3 className={`text-xl font-bold mb-1 ${tier.isFeatured ? 'text-white' : 'text-dark'}`}>
                  {tier.name}
                </h3>
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
                  {tier.features.map(({ feature }, j) => (
                    <li
                      key={j}
                      className={`flex items-start gap-2 text-sm ${tier.isFeatured ? 'text-mint/90' : 'text-muted'}`}
                    >
                      <span className="text-green mt-0.5 flex-shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href="/join"
                className={`mt-auto text-center font-bold py-3.5 rounded-full transition-all ${
                  tier.isFeatured
                    ? 'bg-orange text-white hover:brightness-110'
                    : 'bg-forest text-white hover:brightness-110'
                }`}
              >
                {tier.ctaLabel ?? 'Join Now'}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-muted/70 text-sm mt-8">
          Lost or damaged toys may incur a replacement fee. See our T&amp;Cs for details.
        </p>
      </div>
    </section>
  )
}
