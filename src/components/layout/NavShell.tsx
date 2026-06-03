'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = { label: string; href: string; isCTA?: boolean; isScrollLink?: boolean }

type Props = {
  navItems?: NavItem[]
  copyright?: string
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Home',      href: '/' },
  { label: 'Our Toys',  href: '/toys' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'News',      href: '/news' },
  { label: 'FAQ',       href: '/#faq' },
  { label: 'Contact',   href: '/#contact' },
]

const DEFAULT_CTA: NavItem = { label: 'Join Now →', href: '/#membership', isCTA: true }

export function NavShell({ navItems, copyright = 'Brisbane West Toy Library Inc.' }: Props) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const [isOpen, setIsOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)

  const items = navItems ?? DEFAULT_NAV_ITEMS
  const regularItems = items.filter(i => !i.isCTA)
  const ctaItem = items.find(i => i.isCTA) ?? DEFAULT_CTA

  // On home: track when user scrolls past the hero section
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

  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(o => !o)

  const barBase = 'block w-5 h-0.5 rounded-sm transition-all duration-250'

  // ─── Floating button (home page while hero is visible) ────────────────────
  const FloatingButton = (
    <button
      onClick={toggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className={[
        'fixed top-5 left-5 z-[200] w-12 h-12 rounded-full',
        'flex flex-col items-center justify-center gap-[5px]',
        'backdrop-blur-md border transition-all shadow-md cursor-pointer',
        'bg-white/[0.18] border-white/35',
      ].join(' ')}
    >
      <span className={`${barBase} bg-white ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`${barBase} bg-white ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
      <span className={`${barBase} bg-white ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </button>
  )

  // ─── Sticky header (always in DOM; slides in/out on home page) ────────────
  const StickyHeader = (
    <header className={[
      isHome ? 'fixed' : 'sticky',
      'top-0 left-0 right-0 z-[150] h-16 w-full',
      'flex items-center px-4 md:px-6',
      'bg-cream/95 backdrop-blur-sm border-b border-mint/40',
      'shadow-[0_1px_8px_0_rgba(20,43,30,0.07)]',
      isHome ? 'transition-transform duration-300' : '',
      isHome && overHero ? '-translate-y-full' : 'translate-y-0',
    ].join(' ')}>

      {/* Hamburger — mobile only */}
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className={[
          'flex-none md:hidden',
          'w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[5px]',
          'cursor-pointer bg-forest/[0.08] border border-forest/15',
          'hover:bg-forest/15 transition-colors',
        ].join(' ')}
      >
        <span className={`${barBase} bg-forest ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
        <span className={`${barBase} bg-forest ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
        <span className={`${barBase} bg-forest ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
      </button>

      {/* Logo — absolute-centered on mobile, left-flow on desktop */}
      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex-none flex items-center hover:opacity-80 transition-opacity"
      >
        <img
          src="/ibis-flat.svg"
          alt="Brisbane West Toy Library"
          className="h-12 w-auto"
          onError={(e) => {
            const el = e.currentTarget
            el.style.display = 'none'
            const fallback = el.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'block'
          }}
        />
        <span className="font-bold text-dark text-[0.95rem] tracking-tight" style={{ display: 'none' }}>
          Brisbane West Toy Library
        </span>
      </Link>

      {/* Desktop nav links — hidden on mobile */}
      <nav className="hidden md:flex flex-1 items-center justify-end gap-5 ml-8">
        {regularItems.map(item => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm font-semibold text-dark hover:text-forest transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={ctaItem.href}
          className="ml-2 bg-orange text-white px-4 py-1.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
        >
          {ctaItem.label}
        </Link>
      </nav>
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
        'bg-cream/50 backdrop-blur-md',
        'transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <div className="mb-10 px-5 py-3">
        <img
          src="/ibis-flat.svg"
          alt="Brisbane West Toy Library"
          className="h-12 w-auto"
          onError={(e) => {
            const el = e.currentTarget
            el.style.display = 'none'
            const fallback = el.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'block'
          }}
        />
        <p className="text-dark/50 text-xs tracking-[0.12em] uppercase" style={{ display: 'none' }}>
          Brisbane West Toy Library
        </p>
      </div>

      <nav>
        <ul className="flex flex-col gap-1 text-center">
          {regularItems.map(item => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={close}
                className="block text-forest font-bold text-[clamp(1.5rem,5vw,2.25rem)] px-6 py-2 rounded-lg hover:text-orange hover:bg-forest/8 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={ctaItem.href}
              onClick={close}
              className="inline-block text-orange border-2 border-orange px-10 py-3 rounded-full font-bold text-[clamp(1rem,3vw,1.4rem)] mt-3 hover:bg-orange hover:text-white transition-colors"
            >
              {ctaItem.label}
            </Link>
          </li>
        </ul>
      </nav>

      <p className="absolute bottom-8 text-dark/35 text-xs">
        © {new Date().getFullYear()} {copyright}
      </p>
    </div>
  )

  return (
    <>
      {isHome && overHero && FloatingButton}
      {StickyHeader}
      {NavOverlay}
    </>
  )
}
