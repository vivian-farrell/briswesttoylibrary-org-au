import '@/styles/globals.css'
import { HamburgerMenu } from '@/components/layout/HamburgerMenu'
import { SiteFooter } from '@/components/layout/Footer'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HamburgerMenu />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
