import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'How It Works | Brisbane West Toy Library',
  description: 'How Brisbane West Toy Library works — join, browse, borrow, return, repeat.',
}

const DEFAULT_STEPS = [
  {
    icon: '📋',
    heading: 'Join & Pay',
    body: 'Sign up by contacting us at a session or by email. Pay the small annual membership fee and you\'re ready to go. Concession rates are available — just let us know.',
  },
  {
    icon: '🧸',
    heading: 'Browse & Borrow',
    body: 'Come along to one of our sessions and browse our catalogue. You can borrow up to your tier limit at each visit. Take the toys home for as long as you need them.',
  },
  {
    icon: '🔄',
    heading: 'Return & Swap',
    body: 'Return your toys at the next session when your child is done with them. There\'s no limit on how often you can swap throughout the year — variety is the whole point.',
  },
]

const EXTRA_INFO = [
  {
    icon: '📅',
    heading: 'When are sessions?',
    body: 'We run regular sessions — check the Location section on our home page or contact us for current session times. Sessions are typically held on Saturday mornings.',
  },
  {
    icon: '🧹',
    heading: 'Are toys clean?',
    body: 'Yes. All toys are inspected and cleaned before being returned to the shelf. Toys that are broken or missing pieces are retired from the collection.',
  },
  {
    icon: '📦',
    heading: 'What if a toy is lost or damaged?',
    body: 'We understand accidents happen. If a toy is lost or significantly damaged, a replacement fee may apply. See our terms and conditions for full details.',
  },
  {
    icon: '🌏',
    heading: 'Who can join?',
    body: 'Anyone in the Brisbane area is welcome to join — you don\'t need to live in Kenmore. We serve families across the western suburbs and beyond.',
  },
]

type Step = { icon?: string | null; heading: string; body: string }

export default async function HowItWorksPage() {
  const payload = await getPayloadClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const homepage = await payload.findGlobal({ slug: 'homepage' }).catch(() => null) as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawSteps: any[] = homepage?.howItWorksSection?.steps ?? []
  const steps: Step[] = rawSteps.length >= 3 ? rawSteps.slice(0, 3) : DEFAULT_STEPS

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-site section-pad">
        <div className="mb-14">
          <p className="section-label mb-3">Simple Process</p>
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">How It Works</h1>
          <p className="text-muted text-xl max-w-xl leading-relaxed">
            Toy libraries are simple. Here&apos;s everything you need to know.
          </p>
        </div>

        {/* Main 3 steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 text-center flex flex-col items-center gap-4"
              style={{ background: 'linear-gradient(135deg, #142b1e 0%, #1d5c3a 100%)' }}
            >
              <div className="w-20 h-20 rounded-full bg-white/10 border border-mint/30 flex items-center justify-center text-4xl mb-2">
                {step.icon ?? ['📋', '🧸', '🔄'][i]}
              </div>
              <span className="text-mint/60 text-xs font-bold tracking-widest uppercase">
                Step {i + 1}
              </span>
              <h2 className="text-white font-bold text-xl">{step.heading}</h2>
              <p className="text-mint/80 leading-relaxed text-sm">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Extra info */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXTRA_INFO.map(({ icon, heading, body }) => (
              <div key={heading} className="bg-white rounded-xl p-6 shadow-sm border border-mint/20 flex gap-4">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <p className="font-bold text-dark mb-1">{heading}</p>
                  <p className="text-muted text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/join"
            className="inline-block bg-orange text-white font-bold px-8 py-4 rounded-full hover:brightness-110 transition-all text-center"
          >
            Join Now →
          </Link>
          <Link
            href="/faq"
            className="inline-block bg-white text-forest font-bold px-8 py-4 rounded-full border-2 border-forest/30 hover:bg-forest/5 transition-all text-center"
          >
            Read the FAQ →
          </Link>
        </div>
      </div>
    </div>
  )
}
