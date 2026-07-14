import { describe, it, expect } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'

describe('ToysPage global — field persistence', () => {
  it('saves sectionLabel, heading, and intro fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'toys-page',
      data: {
        sectionLabel: 'Toy Catalogue',
        heading: 'Our Toys',
        intro: 'We stock hundreds of quality educational toys.',
      },
    })
    const result = await payload.findGlobal({ slug: 'toys-page' })
    expect(result.sectionLabel).toBe('Toy Catalogue')
    expect(result.heading).toBe('Our Toys')
    expect(result.intro).toBe('We stock hundreds of quality educational toys.')
  })

  it('saves catalogue card fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'toys-page',
      data: {
        catalogueCardHeading: 'Browse the Catalogue',
        catalogueCardBody: 'Our full toy catalogue is hosted on SETLS.',
        catalogueCtaLabel: 'Open Toy Catalogue →',
      },
    })
    const result = await payload.findGlobal({ slug: 'toys-page' })
    expect(result.catalogueCardHeading).toBe('Browse the Catalogue')
    expect(result.catalogueCardBody).toBe('Our full toy catalogue is hosted on SETLS.')
    expect(result.catalogueCtaLabel).toBe('Open Toy Catalogue →')
  })

  it('saves features array with icon, title, and body', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'toys-page',
      data: {
        features: [
          { icon: '🎯', title: 'Educational', body: 'Puzzles, building sets, STEM kits and more' },
          { icon: '🌿', title: 'Sustainable', body: 'Borrow instead of buy' },
          { icon: '♻️', title: 'Always Rotating', body: 'Return when done and try something new' },
        ],
      },
    })
    const result = await payload.findGlobal({ slug: 'toys-page' })
    const features = result.features as Array<{ icon: string; title: string; body: string }>
    expect(features).toHaveLength(3)
    expect(features[0].icon).toBe('🎯')
    expect(features[0].title).toBe('Educational')
    expect(features[2].body).toBe('Return when done and try something new')
  })

  it('renders onto site: has all fields the /toys page expects', async () => {
    const payload = await getTestPayload()
    const tp = await payload.findGlobal({ slug: 'toys-page' })
    expect(tp).toHaveProperty('sectionLabel')
    expect(tp).toHaveProperty('heading')
    expect(tp).toHaveProperty('intro')
    expect(tp).toHaveProperty('catalogueCardHeading')
    expect(tp).toHaveProperty('catalogueCardBody')
    expect(tp).toHaveProperty('catalogueCtaLabel')
    expect(Array.isArray(tp.features ?? [])).toBe(true)
  })
})
