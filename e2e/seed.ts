// Runs as a child process from global-setup.ts with DATABASE_URL already set in the environment.
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { makeRichText } from '../tests/helpers/richtext.ts'

const payload = await getPayload({ config })

// ── Site Settings ─────────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    comingSoon: false,
    siteName: 'E2E Toy Library',
    tagline: 'E2E site tagline',
    email: 'hello@e2e.example',
    phone: '07 0000 E2E',
    socialLinks: {
      facebook: 'https://facebook.com/e2e-test',
      instagram: 'https://instagram.com/e2e-test',
    },
    setlsCatalogueUrl: 'https://setls.e2e.example/catalogue',
    setlsCalendarUrl: 'https://setls.e2e.example/calendar',
  },
})

// ── Homepage ──────────────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'homepage',
  data: {
    heroHeadline: 'E2E Hero Headline',
    heroTagline: 'E2E Hero Tagline',
    heroSubtitle: 'E2E Hero Subtitle',
    heroCTALabel: 'E2E Join Now',
    heroCTAHref: '/e2e-join',
    scrollLabel: 'E2E Scroll',
    locationSection: {
      heading: 'E2E Location Heading',
      sectionLabel: 'E2E Find Us',
      openingHoursLabel: 'E2E Opening Hours Label',
      directionsLabel: 'E2E Get Directions',
      mapsLabel: 'E2E View on Maps',
      street: 'E2E Location Street',
      suburb: 'E2ELocSuburb',
      state: 'E2ELS',
      postcode: 'E2ELP',
      openingHours: [
        { day: 'E2E Location Day', hours: 'E2E Location Hours' },
      ],
      mapEmbedUrl: 'https://maps.e2e.example/embed',
      directionsUrl: 'https://maps.e2e.example/directions',
    },
    aboutSection: {
      sectionLabel: 'E2E About Label',
      heading: 'E2E About Heading',
      body: 'E2E about body text',
      features: [
        { icon: '🎯', label: 'E2E Feature One' },
        { icon: '🌿', label: 'E2E Feature Two' },
      ],
    },
    howItWorksSection: {
      sectionLabel: 'E2E Process Label',
      heading: 'E2E How It Works',
      steps: [
        { heading: 'E2E Step One', body: 'E2E step one body' },
        { heading: 'E2E Step Two', body: 'E2E step two body' },
        { heading: 'E2E Step Three', body: 'E2E step three body' },
      ],
    },
    faqSection: {
      sectionLabel: 'E2E FAQ Label',
      heading: 'E2E FAQ Heading',
    },
    newsSection: {
      sectionLabel: 'E2E News Label',
      heading: 'E2E News Heading',
      allNewsLabel: 'E2E All News',
    },
    membershipSection: {
      sectionLabel: 'E2E Membership Label',
      heading: 'E2E Membership Heading',
      subheading: 'E2E membership subheading',
      popularBadge: 'E2E Popular',
      disclaimer: 'E2E disclaimer text',
    },
    contactSection: {
      sectionLabel: 'E2E Contact Label',
      heading: 'E2E Contact Heading',
      intro: 'E2E contact intro text',
      formHeading: 'E2E Form Heading',
      formEnabled: true, // so contactSection.formHeading renders
    },
  },
})

// ── Membership Page ───────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'membership-page',
  data: {
    sectionLabel: 'E2E Join Label',
    heading: 'E2E Membership Page Heading',
    intro: makeRichText('E2E membership page intro'),
    tiers: [
      {
        name: 'E2E Standard',
        price6Month: 75,
        price12Month: 130,
        description: 'E2E standard desc',
        isFeatured: false,
        ctaLabel: 'E2E Standard CTA',
        features: [{ feature: 'E2E standard feature' }],
      },
      {
        name: 'E2E Concession',
        price6Month: 55,
        price12Month: 95,
        description: 'E2E concession desc',
        isFeatured: true,
        ctaLabel: 'E2E Concession CTA',
        features: [{ feature: 'E2E concession feature' }],
      },
    ],
    trial: {
      name: 'E2E Trial',
      badge: 'E2E Trial Badge',
      price: 20,
      bondPrice: 20,
      bondNote: 'E2E bond note',
      ctaLabel: 'E2E Trial CTA',
    },
    note: 'E2E membership note',
    termsAndConditions: makeRichText('E2E terms and conditions body'),
  },
})

// ── Volunteer Page ────────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'volunteer-page',
  data: {
    sectionLabel: 'E2E Volunteering Label',
    heading: 'E2E Volunteer Heading',
    intro: 'E2E volunteer intro',
    content: makeRichText('E2E volunteer body'),
    rolesHeading: 'E2E Roles Heading',
    roles: [
      {
        title: 'E2E Role Title',
        description: 'E2E role desc',
        commitment: 'E2E commitment',
      },
    ],
    calendarLabel: 'E2E Shift Calendar',
    ctaLabel: 'E2E Express Interest',
    ctaEmail: 'volunteer@e2e.example',
  },
})

// ── Toys Page ─────────────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'toys-page',
  data: {
    sectionLabel: 'E2E Toys Label',
    heading: 'E2E Toys Heading',
    intro: 'E2E toys intro text',
    catalogueCardHeading: 'E2E Catalogue Card Heading',
    catalogueCardBody: 'E2E catalogue card body',
    catalogueCtaLabel: 'E2E Open Catalogue',
    features: [
      { icon: '🎯', title: 'E2E Toys Feature', body: 'E2E toys feature body' },
    ],
  },
})

// ── News Page ─────────────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'news-page',
  data: {
    sectionLabel: 'E2E News Page Label',
    heading: 'E2E News Page Heading',
    emptyStateText: 'E2E no posts yet',
  },
})

// ── Navigation ────────────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'navigation',
  data: {
    items: [
      { label: 'E2E Nav One', href: '/#location', isCTA: false },
      { label: 'E2E Nav CTA', href: '/join', isCTA: true },
    ],
  },
})

// ── Footer ────────────────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'footer',
  data: {
    aboutText: 'E2E footer about text',
    exploreColumnHeading: 'E2E Explore',
    involvedColumnHeading: 'E2E Get Involved',
    acknowledgement: 'E2E acknowledgement text',
    copyright: 'E2E Library Inc',
    exploreLinks: [{ label: 'E2E Explore Link', href: '/e2e-explore' }],
    involvedLinks: [{ label: 'E2E Involved Link', href: '/e2e-involved' }],
  },
})

// ── FAQs Collection ───────────────────────────────────────────────────────────
await payload.create({
  collection: 'faqs',
  data: {
    question: 'E2E FAQ Question?',
    answer: makeRichText('E2E FAQ answer'),
    category: 'general',
    order: 1,
  },
})

// ── Posts Collection ──────────────────────────────────────────────────────────
await payload.create({
  collection: 'posts',
  data: {
    title: 'E2E Test Post',
    slug: 'e2e-test-post',
    status: 'published',
    publishedAt: new Date().toISOString(),
    category: 'news',
    excerpt: 'E2E test excerpt',
  },
})

process.exit(0)
