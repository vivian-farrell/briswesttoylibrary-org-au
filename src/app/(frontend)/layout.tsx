import '@/styles/globals.css'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { NavShell } from '@/components/layout/NavShell'
import { SiteFooter } from '@/components/layout/Footer'
import { ComingSoon } from '@/components/ComingSoon'
import { getPayloadClient } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  let siteName = 'Brisbane West Toy Library'
  let tagline = 'Toys. Imagination. Community.'
  try {
    const payload = await getPayloadClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings = (await payload.findGlobal({ slug: 'site-settings' })) as any
    siteName = settings?.siteName ?? siteName
    tagline = settings?.tagline ?? tagline
  } catch {
    // DB unavailable — fall back to defaults
  }
  return {
    title: { default: siteName, template: `%s | ${siteName}` },
    description: tagline,
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let settings: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let nav: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let footer: any = null
  try {
    const payload = await getPayloadClient()
    ;[settings, nav, footer] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings' }),
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'footer' }),
    ])
  } catch {
    // DB unavailable — render normally, coming soon check skipped
  }

  const cookieStore = await cookies()
  const testMode = cookieStore.get('testmode')?.value === '1'

  if (settings?.comingSoon && !testMode) {
    return (
      <html lang="en">
        <body>
          <ComingSoon />
        </body>
      </html>
    )
  }

  const navItems = (nav?.items ?? []).map((i: any) => ({
    label: i.label as string,
    href: i.href as string,
    isCTA: i.isCTA as boolean,
  }))

  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[300] focus:bg-white focus:text-forest focus:font-bold focus:px-5 focus:py-2.5 focus:rounded-full focus:shadow-lg"
        >
          Skip to main content
        </a>
        <NavShell
          navItems={navItems.length > 0 ? navItems : undefined}
          copyright={footer?.copyright}
        />
        <main id="main-content">{children}</main>
        <SiteFooter
          aboutText={footer?.aboutText}
          exploreColumnHeading={footer?.exploreColumnHeading}
          involvedColumnHeading={footer?.involvedColumnHeading}
          exploreLinks={footer?.exploreLinks}
          involvedLinks={footer?.involvedLinks}
          acknowledgement={footer?.acknowledgement}
          copyright={footer?.copyright}
        />
      </body>
    </html>
  )
}
