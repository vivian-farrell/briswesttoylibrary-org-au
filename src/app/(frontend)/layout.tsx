import '@/styles/globals.css'
import { HamburgerMenu } from '@/components/layout/HamburgerMenu'
import { SiteFooter } from '@/components/layout/Footer'
import { ErudaDevTools } from '@/components/ErudaDevTools'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[300] focus:bg-white focus:text-forest focus:font-bold focus:px-5 focus:py-2.5 focus:rounded-full focus:shadow-lg"
        >
          Skip to main content
        </a>
        <HamburgerMenu />
        <main id="main-content">{children}</main>
        <SiteFooter />
        {process.env.NEXT_PUBLIC_DEVTOOLS === 'true' && <ErudaDevTools />}
      </body>
    </html>
  )
}
