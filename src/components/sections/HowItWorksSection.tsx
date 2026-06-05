type Step = { icon?: string | null; heading: string; body: string }

type Props = {
  steps?: Step[]
  sectionLabel?: string
  heading?: string
}

const DEFAULT_STEPS: Step[] = [
  {
    icon: '📋',
    heading: 'Join & Pay',
    body: 'Sign up online or in person. Pay the small annual membership fee and you\'re in.',
  },
  {
    icon: '🧸',
    heading: 'Browse & Borrow',
    body: 'Browse hundreds of toys and borrow up to your tier limit. Pick up at our sessions.',
  },
  {
    icon: '🔄',
    heading: 'Return & Repeat',
    body: 'Return toys when your child is ready for something new. Swap as often as you like.',
  },
]

const FALLBACK_ICONS = ['📋', '🧸', '🔄']

export function HowItWorksSection({ steps = [], sectionLabel = 'Simple Process', heading = 'How It Works' }: Props) {
  const display = steps.length >= 3 ? steps.slice(0, 3) : DEFAULT_STEPS

  return (
    <section
      id="how-it-works"
      className="section-pad"
      style={{ background: 'var(--palette-mint)' }}
    >
      <div className="container-site">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-dark">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {display.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white/50 border border-white/60 flex items-center justify-center mb-5 text-4xl">
                {step.icon ?? FALLBACK_ICONS[i]}
              </div>
              <span className="text-dark/50 text-xs font-bold tracking-widest uppercase mb-2">
                Step {i + 1}
              </span>
              <h3 className="text-dark font-bold text-xl mb-3">{step.heading}</h3>
              <p className="text-dark/80 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
