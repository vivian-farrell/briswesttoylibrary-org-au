'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Home',      href: '/' },
  { label: 'Our Toys',  href: '/toys' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'News',      href: '/news' },
  { label: 'FAQ',       href: '/faq' },
  { label: 'Contact',   href: '/#contact' },
]

export function NavShell() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const [isOpen, setIsOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)

  // On home: switch floating button styling once user scrolls past the hero
  useEffect(() => {
    if (!isHome) {
      setOverHero(false)
      return
    }
    const hero = document.getElementById('hero')
    if (!hero) return
    const obs = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0.1 },
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [isHome])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Scroll lock when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Move focus to first nav link when overlay opens
  useEffect(() => {
    if (isOpen && overlayRef.current) {
      const firstLink = overlayRef.current.querySelector<HTMLElement>('a')
      firstLink?.focus()
    }
  }, [isOpen])

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(o => !o)

  // Shared bar classes
  const barBase = 'block w-5 h-0.5 rounded-sm transition-all duration-250'

  // ─── Floating button (home only) ──────────────────────────────────────────
  const FloatingButton = (
    <button
      onClick={toggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className={[
        'fixed top-5 left-5 z-[200] w-12 h-12 rounded-full',
        'flex flex-col items-center justify-center gap-[5px]',
        'backdrop-blur-md border transition-all shadow-md cursor-pointer',
        !isOpen && !overHero
          ? 'bg-forest/10 border-forest/25'
          : 'bg-white/[0.18] border-white/35',
      ].join(' ')}
    >
      <span className={`${barBase} ${!isOpen && !overHero ? 'bg-forest' : 'bg-white'} ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`${barBase} ${!isOpen && !overHero ? 'bg-forest' : 'bg-white'} ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
      <span className={`${barBase} ${!isOpen && !overHero ? 'bg-forest' : 'bg-white'} ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </button>
  )

  // ─── Sticky header (inner pages) ──────────────────────────────────────────
  const StickyHeader = (
    <header className={[
      'sticky top-0 z-[150] h-14 w-full',
      'flex items-center px-4 gap-3',
      'bg-cream/95 backdrop-blur-sm border-b border-mint/40',
      'shadow-[0_1px_8px_0_rgba(20,43,30,0.07)]',
    ].join(' ')}>
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className={[
          'w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[5px]',
          'cursor-pointer bg-forest/[0.08] border border-forest/15',
          'hover:bg-forest/15 transition-colors',
        ].join(' ')}
      >
        <span className={`${barBase} bg-forest ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
        <span className={`${barBase} bg-forest ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
        <span className={`${barBase} bg-forest ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
      </button>
      <Link
        href="/"
        className="font-bold text-dark text-[0.95rem] tracking-tight hover:text-forest transition-colors"
      >
        Brisbane West Toy Library
      </Link>
    </header>
  )

  // ─── Full-screen overlay ───────────────────────────────────────────────────
  const NavOverlay = (
    <div
      ref={overlayRef}
      data-nav-overlay
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
      className={[
        'fixed inset-0 z-[180] flex flex-col items-center justify-center',
        'transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
      style={{ background: 'linear-gradient(145deg, #0a1628 0%, #162040 100%)' }}
    >
      {/* Logo — drop public/logo.svg (or logo.png) to activate */}
      <div className="mb-10">
        <img
          src="/logo.svg"
          alt="Brisbane West Toy Library"
          className="h-16 w-auto"
          style={{ filter: 'brightness(0) invert(1)' }}
          onError={(e) => {
            const el = e.currentTarget
            el.style.display = 'none'
            const fallback = el.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'block'
          }}
        />
        <p className="text-white/35 text-xs tracking-[0.12em] uppercase" style={{ display: 'none' }}>
          Brisbane West Toy Library
        </p>
      </div>

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
  )

  return (
    <>
      {isHome ? FloatingButton : StickyHeader}
      {NavOverlay}
    </>
  )
}
