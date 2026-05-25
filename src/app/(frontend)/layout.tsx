import '@/styles/globals.css'
import { cookies } from 'next/headers'
import { NavShell } from '@/components/layout/NavShell'
import { SiteFooter } from '@/components/layout/Footer'
import { ErudaDevTools } from '@/components/ErudaDevTools'
import { ComingSoon } from '@/components/ComingSoon'
import { getPayloadClient } from '@/lib/payload'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let settings: any = null
  try {
    const payload = await getPayloadClient()
    settings = await payload.findGlobal({ slug: 'site-settings' })
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

  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[300] focus:bg-white focus:text-forest focus:font-bold focus:px-5 focus:py-2.5 focus:rounded-full focus:shadow-lg"
        >
          Skip to main content
        </a>
        <NavShell />
        <main id="main-content">{children}</main>
        <SiteFooter />
        {process.env.NEXT_PUBLIC_DEVTOOLS === 'true' && <ErudaDevTools />}
      </body>
    </html>
  )
}
