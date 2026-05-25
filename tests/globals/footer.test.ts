import { describe, it, expect } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'

describe('Footer global — field persistence', () => {
  it('saves acknowledgement and copyright text fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        acknowledgement: 'We acknowledge the Turrbal and Yuggera peoples.',
        copyright: 'Brisbane West Toy Library Inc.',
      },
    })
    const result = await payload.findGlobal({ slug: 'footer' })
    expect(result.acknowledgement).toBe('We acknowledge the Turrbal and Yuggera peoples.')
    expect(result.copyright).toBe('Brisbane West Toy Library Inc.')
  })

  it('saves exploreLinks array', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        exploreLinks: [
          { label: 'Toys', href: '/toys' },
          { label: 'FAQ', href: '/faq' },
          { label: 'News', href: '/news' },
        ],
      },
    })
    const result = await payload.findGlobal({ slug: 'footer' })
    const links = result.exploreLinks as Array<{ label: string; href: string }>
    expect(links).toHaveLength(3)
    expect(links[0].label).toBe('Toys')
    expect(links[0].href).toBe('/toys')
    expect(links[2].label).toBe('News')
  })

  it('saves involvedLinks array', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        involvedLinks: [
          { label: 'Join', href: '/join' },
          { label: 'Volunteer', href: '/volunteer' },
        ],
      },
    })
    const result = await payload.findGlobal({ slug: 'footer' })
    const links = result.involvedLinks as Array<{ label: string; href: string }>
    expect(links).toHaveLength(2)
    expect(links[0].label).toBe('Join')
    expect(links[1].label).toBe('Volunteer')
  })

  it('renders onto site: footer has required fields for Footer component', async () => {
    const payload = await getTestPayload()
    const footer = await payload.findGlobal({ slug: 'footer' })
    expect(footer).toHaveProperty('acknowledgement')
    expect(footer).toHaveProperty('copyright')
    expect(footer).toHaveProperty('exploreLinks')
    expect(footer).toHaveProperty('involvedLinks')
  })
})
