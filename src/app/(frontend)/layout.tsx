import { HamburgerMenu } from '@/components/layout/HamburgerMenu'
import { SiteFooter } from '@/components/layout/Footer'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HamburgerMenu />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
