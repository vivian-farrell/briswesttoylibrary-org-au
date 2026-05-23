import Link from 'next/link'
import { LogoImage } from '@/components/ui/LogoImage'

const EXPLORE = [
  { label: 'Our Toys',     href: '/toys' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Membership',   href: '/#membership' },
  { label: 'News & Blog',  href: '/news' },
  { label: 'FAQ',          href: '/faq' },
]

const INVOLVED = [
  { label: 'Join Now',    href: '/#membership' },
  { label: 'Volunteer',   href: '/volunteer' },
  { label: 'Donate Toys', href: '/#contact' },
  { label: 'Contact Us',  href: '/#contact' },
]

export function SiteFooter() {
  return (
    <footer className="bg-dark text-white/70">
      <div className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            {/* Logo — drop public/logo.svg to activate */}
            <LogoImage className="h-12 w-auto mb-3" style={{ filter: 'brightness(0) invert(1)' }} />
            <h3 className="text-white font-bold text-lg mb-2">Brisbane West Toy Library</h3>
            <p className="text-sm leading-relaxed">
              A community toy library serving Kenmore and Brisbane&apos;s west since 1978.
              Not-for-profit, volunteer-run, and proud of it.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Explore</h4>
            <ul className="flex flex-col gap-2">
              {EXPLORE.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/55 hover:text-yellow transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Get Involved</h4>
            <ul className="flex flex-col gap-2">
              {INVOLVED.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/55 hover:text-yellow transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-wrap gap-3 justify-between items-start">
          <p className="text-xs text-white/40 italic max-w-prose leading-relaxed">
            Brisbane West Toy Library acknowledges the Traditional Custodians of the land on which
            we meet and play — the Turrbal and Yuggera peoples — and pays respect to their Elders
            past, present, and emerging.
          </p>
          <p className="text-xs text-white/35">© {new Date().getFullYear()} Brisbane West Toy Library Inc.</p>
        </div>
      </div>
    </footer>
  )
}
