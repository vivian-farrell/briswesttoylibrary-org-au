import { describe, it, expect } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'

describe('Navigation global — field persistence', () => {
  it('saves items array with label, href, isScrollLink, and isCTA', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        items: [
          { label: 'Home', href: '/', isScrollLink: false, isCTA: false },
          { label: 'How It Works', href: '/#how-it-works', isScrollLink: true, isCTA: false },
          { label: 'Join', href: '/join', isScrollLink: false, isCTA: true },
        ],
      },
    })
    const result = await payload.findGlobal({ slug: 'navigation' })
    const items = result.items as Array<{
      label: string
      href: string
      isScrollLink: boolean
      isCTA: boolean
    }>

    expect(items).toHaveLength(3)

    expect(items[0].label).toBe('Home')
    expect(items[0].href).toBe('/')
    expect(items[0].isScrollLink).toBe(false)
    expect(items[0].isCTA).toBe(false)

    expect(items[1].label).toBe('How It Works')
    expect(items[1].href).toBe('/#how-it-works')
    expect(items[1].isScrollLink).toBe(true)

    expect(items[2].label).toBe('Join')
    expect(items[2].isCTA).toBe(true)
  })

  it('renders onto site: each nav item has required label and href for NavShell', async () => {
    const payload = await getTestPayload()
    const nav = await payload.findGlobal({ slug: 'navigation' })
    const items = (nav.items ?? []) as Array<{ label: string; href: string }>
    items.forEach((item) => {
      expect(typeof item.label).toBe('string')
      expect(typeof item.href).toBe('string')
    })
  })
})
