import Link from 'next/link'
import { LogoImage } from '@/components/ui/LogoImage'

type FooterLink = { label: string; href: string }

type Props = {
  aboutText?: string
  exploreColumnHeading?: string
  involvedColumnHeading?: string
  exploreLinks?: FooterLink[]
  involvedLinks?: FooterLink[]
  acknowledgement?: string
  copyright?: string
}

const DEFAULT_EXPLORE: FooterLink[] = [
  { label: 'Our Toys',     href: '/toys' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Membership',   href: '/#membership' },
  { label: 'News & Blog',  href: '/news' },
  { label: 'FAQ',          href: '/faq' },
]

const DEFAULT_INVOLVED: FooterLink[] = [
  { label: 'Join Now',    href: '/#membership' },
  { label: 'Volunteer',   href: '/volunteer' },
  { label: 'Donate Toys', href: '/#contact' },
  { label: 'Contact Us',  href: '/#contact' },
]

const DEFAULT_ACKNOWLEDGEMENT =
  'Brisbane West Toy Library acknowledges the Traditional Custodians of the land on which we meet and play — the Turrbal and Yuggera peoples — and pays respect to their Elders past, present, and emerging.'

export function SiteFooter({
  aboutText = "A community toy library serving Kenmore and Brisbane's west since 1978. Not-for-profit, volunteer-run, and proud of it.",
  exploreColumnHeading = 'Explore',
  involvedColumnHeading = 'Get Involved',
  exploreLinks,
  involvedLinks,
  acknowledgement = DEFAULT_ACKNOWLEDGEMENT,
  copyright = 'Brisbane West Toy Library Inc.',
}: Props) {
  const explore = exploreLinks && exploreLinks.length > 0 ? exploreLinks : DEFAULT_EXPLORE
  const involved = involvedLinks && involvedLinks.length > 0 ? involvedLinks : DEFAULT_INVOLVED

  return (
    <footer className="bg-dark text-white/70">
      <div className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <LogoImage className="h-12 w-auto mb-3" style={{ filter: 'brightness(0) invert(1)' }} />
            <h3 className="text-white font-bold text-lg mb-2">Brisbane West Toy Library</h3>
            <p className="text-sm leading-relaxed">{aboutText}</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">{exploreColumnHeading}</h4>
            <ul className="flex flex-col gap-2">
              {explore.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/55 hover:text-yellow transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">{involvedColumnHeading}</h4>
            <ul className="flex flex-col gap-2">
              {involved.map(item => (
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
          <p className="text-xs text-white/40 italic max-w-prose leading-relaxed">{acknowledgement}</p>
          <p className="text-xs text-white/35">© {new Date().getFullYear()} {copyright}</p>
        </div>
      </div>
    </footer>
  )
}
