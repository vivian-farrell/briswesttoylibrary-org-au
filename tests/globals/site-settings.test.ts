import { describe, it, expect } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'

describe('SiteSettings global — field persistence', () => {
  it('saves comingSoon checkbox', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({ slug: 'site-settings', data: { comingSoon: true } })
    const result = await payload.findGlobal({ slug: 'site-settings' })
    expect(result.comingSoon).toBe(true)

    await payload.updateGlobal({ slug: 'site-settings', data: { comingSoon: false } })
    const after = await payload.findGlobal({ slug: 'site-settings' })
    expect(after.comingSoon).toBe(false)
  })

  it('saves siteName and tagline text fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: 'Test Toy Library',
        tagline: 'Testing is fun.',
      },
    })
    const result = await payload.findGlobal({ slug: 'site-settings' })
    expect(result.siteName).toBe('Test Toy Library')
    expect(result.tagline).toBe('Testing is fun.')
  })

  it('saves email and phone fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        email: 'test@example.org',
        phone: '07 1234 5678',
      },
    })
    const result = await payload.findGlobal({ slug: 'site-settings' })
    expect(result.email).toBe('test@example.org')
    expect(result.phone).toBe('07 1234 5678')
  })

  it('saves socialLinks group fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        socialLinks: {
          facebook: 'https://facebook.com/briswesttoylibrary',
          instagram: 'https://instagram.com/briswesttoylibrary',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'site-settings' })
    const links = result.socialLinks as { facebook: string; instagram: string }
    expect(links.facebook).toBe('https://facebook.com/briswesttoylibrary')
    expect(links.instagram).toBe('https://instagram.com/briswesttoylibrary')
  })

  it('saves setlsCatalogueUrl field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'site-settings',
      data: { setlsCatalogueUrl: 'https://setls.catalogue.example.com' },
    })
    const result = await payload.findGlobal({ slug: 'site-settings' })
    expect(result.setlsCatalogueUrl).toBe('https://setls.catalogue.example.com')
  })

  it('saves setlsCalendarUrl field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'site-settings',
      data: { setlsCalendarUrl: 'https://setls.calendar.example.com' },
    })
    const result = await payload.findGlobal({ slug: 'site-settings' })
    expect(result.setlsCalendarUrl).toBe('https://setls.calendar.example.com')
  })

  it('renders onto site: siteName and tagline feed the layout metadata', async () => {
    const payload = await getTestPayload()
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    // Verify the shape generateMetadata in the frontend layout uses
    expect(typeof settings.siteName).toBe('string')
    expect(settings.siteName!.length).toBeGreaterThan(0)
    expect(typeof settings.tagline).toBe('string')
  })

  it('does not define the removed address/openingHours fields', async () => {
    const payload = await getTestPayload()
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    // Address + opening hours moved to Homepage.locationSection (single source of truth)
    expect(settings).not.toHaveProperty('address')
    expect(settings).not.toHaveProperty('openingHours')
  })
})
