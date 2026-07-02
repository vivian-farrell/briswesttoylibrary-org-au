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

  it('saves address group fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        address: {
          street: '1 Library Lane',
          suburb: 'Kenmore',
          state: 'QLD',
          postcode: '4069',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'site-settings' })
    const addr = result.address as { street: string; suburb: string; state: string; postcode: string }
    expect(addr.street).toBe('1 Library Lane')
    expect(addr.suburb).toBe('Kenmore')
    expect(addr.state).toBe('QLD')
    expect(addr.postcode).toBe('4069')
  })

  it('saves openingHours array', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        openingHours: [
          { day: 'Saturday', hours: '9:00 am – 12:00 pm' },
          { day: 'Sunday', hours: 'Closed' },
        ],
      },
    })
    const result = await payload.findGlobal({ slug: 'site-settings' })
    const hours = result.openingHours as Array<{ day: string; hours: string }>
    expect(hours).toHaveLength(2)
    expect(hours[0].day).toBe('Saturday')
    expect(hours[0].hours).toBe('9:00 am – 12:00 pm')
    expect(hours[1].day).toBe('Sunday')
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

  it('renders onto site: address fields are accessible for contact display', async () => {
    const payload = await getTestPayload()
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    const addr = settings.address as { suburb?: string; state?: string; postcode?: string }
    // Verify the shape the contact section and footer use
    expect(addr).toHaveProperty('suburb')
    expect(addr).toHaveProperty('state')
    expect(addr).toHaveProperty('postcode')
  })
})
