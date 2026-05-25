import { describe, it, expect } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'

describe('Homepage global — hero fields', () => {
  it('saves heroType select field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({ slug: 'homepage', data: { heroType: 'video' } })
    const result = await payload.findGlobal({ slug: 'homepage' })
    expect(result.heroType).toBe('video')

    await payload.updateGlobal({ slug: 'homepage', data: { heroType: 'carousel' } })
    const back = await payload.findGlobal({ slug: 'homepage' })
    expect(back.heroType).toBe('carousel')
  })

  it('saves heroHeadline, heroTagline, heroSubtitle text fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        heroHeadline: 'Test Headline',
        heroTagline: 'Test Tagline Text',
        heroSubtitle: 'Kenmore · Test',
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    expect(result.heroHeadline).toBe('Test Headline')
    expect(result.heroTagline).toBe('Test Tagline Text')
    expect(result.heroSubtitle).toBe('Kenmore · Test')
  })

  it('saves heroCTALabel and heroCTAHref fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        heroCTALabel: 'Sign Up Today',
        heroCTAHref: '/join',
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    expect(result.heroCTALabel).toBe('Sign Up Today')
    expect(result.heroCTAHref).toBe('/join')
  })
})

describe('Homepage global — locationSection group', () => {
  it('saves heading, mapEmbedUrl, directionsUrl', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        locationSection: {
          heading: "We're in Kenmore",
          mapEmbedUrl: 'https://maps.google.com/embed?test',
          directionsUrl: 'https://maps.google.com/directions?test',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const loc = result.locationSection as {
      heading: string
      mapEmbedUrl: string
      directionsUrl: string
    }
    expect(loc.heading).toBe("We're in Kenmore")
    expect(loc.mapEmbedUrl).toBe('https://maps.google.com/embed?test')
    expect(loc.directionsUrl).toBe('https://maps.google.com/directions?test')
  })

  it('saves street, suburb, state, postcode fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        locationSection: {
          street: '8 Brookfield Road',
          suburb: 'Kenmore',
          state: 'QLD',
          postcode: '4069',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const loc = result.locationSection as {
      street: string
      suburb: string
      state: string
      postcode: string
    }
    expect(loc.street).toBe('8 Brookfield Road')
    expect(loc.suburb).toBe('Kenmore')
    expect(loc.state).toBe('QLD')
    expect(loc.postcode).toBe('4069')
  })

  it('saves openingHours array', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        locationSection: {
          openingHours: [
            { day: 'Saturday', hours: '9:00 am – 12:00 pm' },
            { day: 'Tuesday', hours: '6:00 pm – 8:00 pm' },
          ],
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const loc = result.locationSection as {
      openingHours: Array<{ day: string; hours: string }>
    }
    expect(loc.openingHours).toHaveLength(2)
    expect(loc.openingHours[0].day).toBe('Saturday')
    expect(loc.openingHours[0].hours).toBe('9:00 am – 12:00 pm')
    expect(loc.openingHours[1].day).toBe('Tuesday')
    expect(loc.openingHours[1].hours).toBe('6:00 pm – 8:00 pm')
  })

  it('locationSection shape includes all fields expected by LocationSection component', async () => {
    const payload = await getTestPayload()
    const hp = await payload.findGlobal({ slug: 'homepage' })
    const loc = hp.locationSection as object
    expect(loc).toHaveProperty('heading')
    expect(loc).toHaveProperty('street')
    expect(loc).toHaveProperty('suburb')
    expect(loc).toHaveProperty('state')
    expect(loc).toHaveProperty('postcode')
    expect(loc).toHaveProperty('openingHours')
    expect(loc).toHaveProperty('mapEmbedUrl')
    expect(loc).toHaveProperty('directionsUrl')
  })
})

describe('Homepage global — aboutSection group', () => {
  it('saves heading and body fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        aboutSection: {
          heading: 'More toys. Less clutter.',
          body: 'A toy library is exactly what it sounds like.',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const about = result.aboutSection as { heading: string; body: string }
    expect(about.heading).toBe('More toys. Less clutter.')
    expect(about.body).toBe('A toy library is exactly what it sounds like.')
  })
})

describe('Homepage global — howItWorksSection steps array', () => {
  it('saves steps with icon, heading, and body', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        howItWorksSection: {
          steps: [
            { icon: '📋', heading: 'Join', body: 'Pay your annual fee.' },
            { icon: '🧸', heading: 'Borrow', body: 'Choose toys each session.' },
            { icon: '🔄', heading: 'Return', body: 'Bring them back next time.' },
          ],
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const section = result.howItWorksSection as { steps: Array<{ icon: string; heading: string; body: string }> }
    expect(section.steps).toHaveLength(3)
    expect(section.steps[0].icon).toBe('📋')
    expect(section.steps[0].heading).toBe('Join')
    expect(section.steps[1].heading).toBe('Borrow')
    expect(section.steps[2].body).toBe('Bring them back next time.')
  })
})

describe('Homepage global — membershipSection and contactSection', () => {
  it('saves membershipSection heading and subheading', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        membershipSection: {
          heading: 'Affordable membership',
          subheading: 'One fee. Unlimited toys.',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const mem = result.membershipSection as { heading: string; subheading: string }
    expect(mem.heading).toBe('Affordable membership')
    expect(mem.subheading).toBe('One fee. Unlimited toys.')
  })

  it('saves contactSection heading and intro', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        contactSection: {
          heading: "We'd love to hear from you",
          intro: 'Questions? Drop us a line.',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const contact = result.contactSection as { heading: string; intro: string }
    expect(contact.heading).toBe("We'd love to hear from you")
    expect(contact.intro).toBe('Questions? Drop us a line.')
  })
})

describe('Homepage global — rendering data shape', () => {
  it('findGlobal returns all fields expected by the home page component', async () => {
    const payload = await getTestPayload()
    const hp = await payload.findGlobal({ slug: 'homepage' })
    // These are the fields the page.tsx accesses
    expect(hp).toHaveProperty('heroType')
    expect(hp).toHaveProperty('heroHeadline')
    expect(hp).toHaveProperty('heroTagline')
    expect(hp).toHaveProperty('heroSubtitle')
    expect(hp).toHaveProperty('heroCTALabel')
    expect(hp).toHaveProperty('heroCTAHref')
    expect(hp).toHaveProperty('heroSlides')
    expect(hp).toHaveProperty('locationSection')
    expect(hp).toHaveProperty('aboutSection')
    expect(hp).toHaveProperty('howItWorksSection')
    expect(hp).toHaveProperty('membershipSection')
    expect(hp).toHaveProperty('contactSection')
  })
})
