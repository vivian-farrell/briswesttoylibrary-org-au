import '@/styles/globals.css'
import { HamburgerMenu } from '@/components/layout/HamburgerMenu'
import { SiteFooter } from '@/components/layout/Footer'
import { ErudaDevTools } from '@/components/ErudaDevTools'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HamburgerMenu />
        <main>{children}</main>
        <SiteFooter />
        {process.env.NEXT_PUBLIC_DEVTOOLS === 'true' && <ErudaDevTools />}
      </body>
    </html>
  )
}
