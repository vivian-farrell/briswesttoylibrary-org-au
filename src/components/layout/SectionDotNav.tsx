'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero',         label: 'Top' },
  { id: 'location',     label: 'Location' },
  { id: 'about',        label: 'About' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'membership',   label: 'Membership' },
  { id: 'news',         label: 'News' },
  { id: 'contact',      label: 'Contact' },
]

export function SectionDotNav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    )
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    }
    return () => obs.disconnect()
  }, [])

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[150] flex-col gap-3 hidden md:flex"
    >
      {SECTIONS.map(s => (
        <button
          key={s.id}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={s.label}
          title={s.label}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            active === s.id
              ? 'bg-forest scale-125 shadow-sm'
              : 'bg-forest/30 hover:bg-forest/60'
          }`}
        />
      ))}
    </nav>
  )
}
