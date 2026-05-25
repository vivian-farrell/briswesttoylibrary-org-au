'use client'

import Link from 'next/link'

type Props = {
  videoUrl: string
  subtitle: string
  headline: string
  tagline: string
  ctaLabel: string
  ctaHref: string
}

export function HeroVideo({ videoUrl, subtitle, headline, tagline, ctaLabel, ctaHref }: Props) {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

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

      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-1.5 z-10 opacity-50">
        <span className="text-white text-[0.55rem] tracking-[0.22em] uppercase [writing-mode:vertical-rl]">Scroll</span>
        <span className="text-white animate-bounce">↓</span>
      </div>
    </section>
  )
}
