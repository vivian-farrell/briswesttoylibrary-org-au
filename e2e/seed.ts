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
    email: 'hello@e2e.example',
    phone: '07 0000 E2E',
    address: {
      street: '1 E2E Settings Street',
      suburb: 'E2ESettSuburb',
      state: 'E2EState',
      postcode: 'E2EP0ST',
    },
    openingHours: [
      { day: 'E2E Saturday', hours: 'E2E 9am-12pm' },
    ],
    socialLinks: {
      facebook: 'https://facebook.com/e2e-test',
      instagram: 'https://instagram.com/e2e-test',
    },
    setlsCatalogueUrl: 'https://setls.e2e.example/catalogue',
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
        { icon: '📋', heading: 'E2E Step One', body: 'E2E step one body' },
        { icon: '🧸', heading: 'E2E Step Two', body: 'E2E step two body' },
        { icon: '🔄', heading: 'E2E Step Three', body: 'E2E step three body' },
      ],
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
      priceSuffix: '/E2E-yr',
      disclaimer: 'E2E disclaimer text',
    },
    contactSection: {
      sectionLabel: 'E2E Contact Label',
      heading: 'E2E Contact Heading',
      intro: 'E2E contact intro text',
      formHeading: 'E2E Form Heading',
    },
  },
})

// ── Contact Page ──────────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'contact-page',
  data: {
    formEnabled: true, // so contactSection.formHeading renders
  },
})

// ── Membership Page ───────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'membership-page',
  data: {
    heading: 'E2E Membership Page Heading',
    tiers: [
      {
        name: 'E2E Standard',
        price: 85,
        description: 'E2E standard desc',
        isFeatured: false,
        ctaLabel: 'E2E Standard CTA',
        features: [{ feature: 'E2E standard feature' }],
      },
      {
        name: 'E2E Concession',
        price: 45,
        description: 'E2E concession desc',
        isFeatured: true,
        ctaLabel: 'E2E Concession CTA',
        features: [{ feature: 'E2E concession feature' }],
      },
    ],
    note: 'E2E membership note',
  },
})

// ── Volunteer Page ────────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'volunteer-page',
  data: {
    heading: 'E2E Volunteer Heading',
    intro: 'E2E volunteer intro',
    content: makeRichText('E2E volunteer body'),
    roles: [
      {
        title: 'E2E Role Title',
        description: 'E2E role desc',
        commitment: 'E2E commitment',
      },
    ],
    ctaLabel: 'E2E Express Interest',
    ctaEmail: 'volunteer@e2e.example',
  },
})

// ── Navigation ────────────────────────────────────────────────────────────────
await payload.updateGlobal({
  slug: 'navigation',
  data: {
    items: [
      { label: 'E2E Nav One', href: '/#location', isScrollLink: true, isCTA: false },
      { label: 'E2E Nav CTA', href: '/join', isScrollLink: false, isCTA: true },
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
