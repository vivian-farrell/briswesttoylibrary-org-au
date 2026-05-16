import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Brisbane West Toy Library',
    template: '%s | Brisbane West Toy Library',
  },
  description: 'A community toy library serving Kenmore and Brisbane\'s west since 1978.',
}

// Transparent pass-through — each route group provides its own <html>/<body>.
// (frontend)/layout.tsx wraps frontend pages; Payload's RootLayout wraps /admin.
// Nesting <html>/<body> here would double-wrap admin and break all CSS.
export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return children
}
