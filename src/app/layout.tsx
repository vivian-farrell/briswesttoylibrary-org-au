import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Brisbane West Toy Library',
    template: '%s | Brisbane West Toy Library',
  },
  description: 'A community toy library serving Kenmore and Brisbane\'s west since 1978.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
