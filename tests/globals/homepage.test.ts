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

  it('saves scrollLabel field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({ slug: 'homepage', data: { scrollLabel: 'Scroll down' } })
    const result = await payload.findGlobal({ slug: 'homepage' })
    expect(result.scrollLabel).toBe('Scroll down')
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

  it('saves sectionLabel, openingHoursLabel, directionsLabel, mapsLabel fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        locationSection: {
          sectionLabel: 'Find Us',
          openingHoursLabel: 'When We Are Open',
          directionsLabel: 'Get Directions →',
          mapsLabel: 'Open in Maps',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const loc = result.locationSection as {
      sectionLabel: string
      openingHoursLabel: string
      directionsLabel: string
      mapsLabel: string
    }
    expect(loc.sectionLabel).toBe('Find Us')
    expect(loc.openingHoursLabel).toBe('When We Are Open')
    expect(loc.directionsLabel).toBe('Get Directions →')
    expect(loc.mapsLabel).toBe('Open in Maps')
  })

  it('locationSection shape includes all fields expected by LocationSection component', async () => {
    const payload = await getTestPayload()
    const hp = await payload.findGlobal({ slug: 'homepage' })
    const loc = hp.locationSection as object
    expect(loc).toHaveProperty('heading')
    expect(loc).toHaveProperty('sectionLabel')
    expect(loc).toHaveProperty('openingHoursLabel')
    expect(loc).toHaveProperty('directionsLabel')
    expect(loc).toHaveProperty('mapsLabel')
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

  it('saves sectionLabel field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: { aboutSection: { sectionLabel: 'Who We Are' } },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const about = result.aboutSection as { sectionLabel: string }
    expect(about.sectionLabel).toBe('Who We Are')
  })

  it('saves features array with icon and label', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        aboutSection: {
          features: [
            { icon: '🪀', label: 'Quality toys' },
            { icon: '♻️', label: 'Sustainable' },
            { icon: '🤝', label: 'Community' },
          ],
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const about = result.aboutSection as { features: Array<{ icon: string; label: string }> }
    expect(about.features).toHaveLength(3)
    expect(about.features[0].icon).toBe('🪀')
    expect(about.features[0].label).toBe('Quality toys')
    expect(about.features[2].label).toBe('Community')
  })
})

describe('Homepage global — howItWorksSection', () => {
  it('saves sectionLabel and heading fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        howItWorksSection: {
          sectionLabel: 'Easy Steps',
          heading: 'How It Works',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const section = result.howItWorksSection as { sectionLabel: string; heading: string }
    expect(section.sectionLabel).toBe('Easy Steps')
    expect(section.heading).toBe('How It Works')
  })

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

  it('saves an optional image upload per step and resolves it as a media relation', async () => {
    const payload = await getTestPayload()
    // 1x1 transparent PNG
    const pngData = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      'base64',
    )
    const media = await payload.create({
      collection: 'media',
      data: { alt: 'Step photo' },
      // Unique filename per run — Vercel Blob storage persists across builds (unlike test.db,
      // which is recreated fresh each time), so a fixed name collides with a prior build's blob.
      file: { data: pngData, mimetype: 'image/png', name: `step-${Date.now()}.png`, size: pngData.length },
    })

    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        howItWorksSection: {
          steps: [
            { heading: 'Join', body: 'Pay your annual fee.', image: media.id },
            { heading: 'Borrow', body: 'Choose toys each session.' },
            { heading: 'Return', body: 'Bring them back next time.' },
          ],
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const section = result.howItWorksSection as {
      steps: Array<{ heading: string; image?: { url: string; alt: string } | null }>
    }
    expect(section.steps[0].image?.url).toBeTruthy()
    expect(section.steps[0].image?.alt).toBe('Step photo')
    expect(section.steps[1].image ?? null).toBeNull()
  })
})

describe('Homepage global — newsSection group', () => {
  it('saves sectionLabel, heading, allNewsLabel fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        newsSection: {
          sectionLabel: 'Latest News',
          heading: "What's On",
          allNewsLabel: 'All news →',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const news = result.newsSection as { sectionLabel: string; heading: string; allNewsLabel: string }
    expect(news.sectionLabel).toBe('Latest News')
    expect(news.heading).toBe("What's On")
    expect(news.allNewsLabel).toBe('All news →')
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

  it('saves membershipSection label fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        membershipSection: {
          sectionLabel: 'Become a Member',
          popularBadge: 'Best Value',
          priceSuffix: '/yr',
          disclaimer: 'Fees subject to change.',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const mem = result.membershipSection as {
      sectionLabel: string
      popularBadge: string
      priceSuffix: string
      disclaimer: string
    }
    expect(mem.sectionLabel).toBe('Become a Member')
    expect(mem.popularBadge).toBe('Best Value')
    expect(mem.priceSuffix).toBe('/yr')
    expect(mem.disclaimer).toBe('Fees subject to change.')
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

  it('saves contactSection sectionLabel and formHeading fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        contactSection: {
          sectionLabel: 'Say Hello',
          formHeading: 'Send us a message',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const contact = result.contactSection as { sectionLabel: string; formHeading: string }
    expect(contact.sectionLabel).toBe('Say Hello')
    expect(contact.formHeading).toBe('Send us a message')
  })
})

describe('Homepage global — faqSection group', () => {
  it('saves faqSection sectionLabel and heading', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        faqSection: {
          sectionLabel: 'Help',
          heading: 'Frequently Asked Questions',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'homepage' })
    const faq = result.faqSection as { sectionLabel: string; heading: string }
    expect(faq.sectionLabel).toBe('Help')
    expect(faq.heading).toBe('Frequently Asked Questions')
  })
})

describe('Homepage global — rendering data shape', () => {
  it('findGlobal returns all fields expected by the home page component', async () => {
    const payload = await getTestPayload()
    const hp = await payload.findGlobal({ slug: 'homepage' })
    expect(hp).toHaveProperty('heroType')
    expect(hp).toHaveProperty('heroHeadline')
    expect(hp).toHaveProperty('heroTagline')
    expect(hp).toHaveProperty('heroSubtitle')
    expect(hp).toHaveProperty('scrollLabel')
    expect(hp).toHaveProperty('heroCTALabel')
    expect(hp).toHaveProperty('heroCTAHref')
    expect(hp).toHaveProperty('heroSlides')
    expect(hp).toHaveProperty('locationSection')
    expect(hp).toHaveProperty('aboutSection')
    expect(hp).toHaveProperty('howItWorksSection')
    expect(hp).toHaveProperty('newsSection')
    expect(hp).toHaveProperty('membershipSection')
    expect(hp).toHaveProperty('faqSection')
    expect(hp).toHaveProperty('contactSection')
  })
})
