'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Slide = { url: string; alt: string }

type Props = {
  slides: Slide[]
  subtitle: string
  headline: string
  tagline: string
  ctaLabel: string
  ctaHref: string
  scrollLabel?: string
}

export function HeroCarousel({ slides, subtitle, headline, tagline, ctaLabel, ctaHref, scrollLabel = 'Scroll' }: Props) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => setCurrent(i => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {slides.length > 0 ? (
        slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image src={slide.url} alt={slide.alt} fill className="object-cover" priority={i === 0} />
          </div>
        ))
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #0a1628 0%, #162040 60%, #1f52b8 100%)' }}
        />
      )}

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-mint/80 text-xs tracking-[0.18em] uppercase font-semibold mb-4">
          {subtitle}
        </p>
        <h1 className="text-white font-black text-[clamp(2.2rem,7vw,4.5rem)] leading-[1.1] mb-5">
          {headline}
        </h1>
        <p className="text-white/85 text-[clamp(1rem,2.5vw,1.3rem)] leading-relaxed mb-8 max-w-xl mx-auto">
          {tagline}
        </p>
        <Link
          href={ctaHref}
          className="inline-block bg-orange text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:brightness-110 transition-all"
        >
          {ctaLabel}
        </Link>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-1.5 z-10 opacity-50">
        <span className="text-white text-[0.55rem] tracking-[0.22em] uppercase [writing-mode:vertical-rl]">{scrollLabel}</span>
        <span className="text-white animate-bounce">↓</span>
      </div>
    </section>
  )
}
