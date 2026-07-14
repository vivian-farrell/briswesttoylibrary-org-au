'use client'

import { useState } from 'react'
import Link from 'next/link'

type Tier = {
  name: string
  description?: string | null
  price6Month?: number | null
  price12Month?: number | null
  features?: { feature: string }[]
  isFeatured?: boolean
  ctaLabel?: string | null
}

export function TierCard({ tier, popularBadge = 'Most Popular' }: { tier: Tier; popularBadge?: string }) {
  const [duration, setDuration] = useState<'6' | '12'>('12')
  const price = duration === '6' ? tier.price6Month : tier.price12Month

  return (
    <div
      className={`rounded-2xl p-8 flex flex-col gap-5 bg-white text-dark ${
        // Featured floats above the page on a soft neutral shadow.
        // Standard sits flatter with a hairline sky-tint border.
        tier.isFeatured ? 'shadow-float' : 'shadow-md border border-mint/40'
      }`}
    >
      {tier.isFeatured && (
        <span className="text-xs font-bold uppercase tracking-widest text-white bg-accent px-3 py-1 rounded-full self-start">
          {popularBadge}
        </span>
      )}

      <div>
        <h3 className="text-xl font-bold mb-1 text-dark">{tier.name}</h3>
        {tier.description && (
          <p className="text-sm text-muted">{tier.description}</p>
        )}
      </div>

      <div
        role="group"
        aria-label={`${tier.name} membership duration`}
        className="inline-flex rounded-xl border border-mint/40 bg-cream p-1 gap-1 self-start"
      >
        <button
          type="button"
          aria-pressed={duration === '6'}
          onClick={() => setDuration('6')}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            duration === '6' ? 'bg-accent text-white' : 'text-muted hover:text-dark'
          }`}
        >
          6 months
        </button>
        <button
          type="button"
          aria-pressed={duration === '12'}
          onClick={() => setDuration('12')}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            duration === '12' ? 'bg-accent text-white' : 'text-muted hover:text-dark'
          }`}
        >
          12 months
        </button>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-5xl font-black text-dark">
          {price != null ? `$${price}` : '—'}
        </span>
        <span className="text-sm mb-2 text-muted">
          for {duration} months
        </span>
      </div>

      {tier.features && tier.features.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {tier.features.map(({ feature }, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-muted">
              <span className="mt-0.5 flex-shrink-0 text-accent">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Featured → primary (solid coral). Standard → secondary (coral outline). */}
      <Link
        href="/join"
        className={`mt-auto text-center font-bold py-3.5 rounded-full transition-all ${
          tier.isFeatured
            ? 'bg-accent text-white hover:brightness-105'
            : 'border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white'
        }`}
      >
        {tier.ctaLabel ?? 'Join Now'}
      </Link>
    </div>
  )
}
