'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'Our Toys',  href: '/toys' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'News',      href: '/news' },
  { label: 'FAQ',       href: '/faq' },
  { label: 'Contact',   href: '/#contact' },
]

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)

  // Switch button to dark-mode styling once user scrolls past the hero
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const obs = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0.1 },
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const close = () => setIsOpen(false)

  const btnBase = 'fixed top-5 left-5 z-[200] w-12 h-12 rounded-full flex flex-col items-center justify-center gap-[5px] backdrop-blur-md border transition-all shadow-md'
  const btnLight = 'bg-white/[0.18] border-white/35'
  const btnDark = 'bg-forest/10 border-forest/25'

  const barBase = 'block w-5 h-0.5 rounded-sm transition-all duration-250'
  const barLight = 'bg-white'
  const barDark = 'bg-forest'

  return (
    <>
      <button
        onClick={() => setIsOpen(o => !o)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className={`${btnBase} ${!isOpen && !overHero ? btnDark : btnLight}`}
      >
        <span className={`${barBase} ${!isOpen && !overHero ? barDark : barLight} ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
        <span className={`${barBase} ${!isOpen && !overHero ? barDark : barLight} ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
        <span className={`${barBase} ${!isOpen && !overHero ? barDark : barLight} ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
      </button>

      {/* Full-screen overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onClick={(e) => { if (e.target === e.currentTarget) close() }}
        className={`fixed inset-0 z-[180] flex flex-col items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'linear-gradient(145deg, #142b1e 0%, #1d5c3a 100%)' }}
      >
        <p className="text-white/35 text-xs tracking-[0.12em] uppercase mb-10">
          Brisbane West Toy Library
        </p>

        <nav>
          <ul className="flex flex-col gap-1 text-center">
            {NAV_ITEMS.map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block text-white/88 font-bold text-[clamp(1.5rem,5vw,2.25rem)] px-6 py-2 rounded-lg hover:text-yellow hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#membership"
                onClick={close}
                className="inline-block text-yellow border-2 border-yellow px-10 py-3 rounded-full font-bold text-[clamp(1rem,3vw,1.4rem)] mt-3 hover:bg-yellow hover:text-dark transition-colors"
              >
                Join Now →
              </Link>
            </li>
          </ul>
        </nav>

        <p className="absolute bottom-8 text-white/25 text-xs">
          © {new Date().getFullYear()} Brisbane West Toy Library Inc.
        </p>
      </div>
    </>
  )
}
