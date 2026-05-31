import Image from 'next/image'

type Feature = { icon: string; label: string }

type Props = {
  heading: string
  body: string
  imageUrl?: string | null
  imageAlt?: string | null
  sectionLabel?: string
  features?: Feature[]
}

const DEFAULT_FEATURES: Feature[] = [
  { icon: '🪀', label: 'Quality toys' },
  { icon: '♻️', label: 'Sustainable' },
  { icon: '🤝', label: 'Community' },
]

export function WhatIsAToyLibrary({ heading, body, imageUrl, imageAlt, sectionLabel = 'About', features }: Props) {
  const displayFeatures = features && features.length > 0 ? features : DEFAULT_FEATURES

  return (
    <section id="about" className="bg-cream section-pad">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label mb-3">{sectionLabel}</p>
            <h2 className="text-3xl md:text-4xl font-black text-dark mb-6">{heading}</h2>
            <p className="text-muted text-lg leading-relaxed mb-8">{body}</p>
            <div className="flex flex-wrap gap-6">
              {displayFeatures.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-forest font-semibold">
                  <span className="text-2xl">{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-mint/30">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt ?? 'Children playing with toys'}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                🧸
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
