import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Home Page',
  admin: { group: 'Content' },
  fields: [
    // ── Hero ────────────────────────────────────────────────
    {
      name: 'heroType',
      type: 'select',
      label: 'Hero Type',
      defaultValue: 'carousel',
      required: true,
      options: [
        { label: 'Photo Carousel', value: 'carousel' },
        { label: 'Video Background', value: 'video' },
      ],
      admin: { description: 'Switch between a cycling photo carousel and a full-screen video.' },
    },
    {
      name: 'heroSlides',
      type: 'array',
      label: 'Carousel Slides',
      admin: {
        description: 'Photos that cycle in the hero. Minimum 2, recommended 3–5.',
        condition: (data) => data?.heroType !== 'video',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'heroVideo',
      type: 'upload',
      label: 'Hero Video (MP4)',
      relationTo: 'media',
      admin: {
        description: 'Upload an MP4 file for the hero background video.',
        condition: (data) => data?.heroType === 'video',
      },
    },
    {
      name: 'heroSubtitle',
      type: 'text',
      label: 'Hero Subtitle',
      defaultValue: "Kenmore · Brisbane's West · Since 1978",
      admin: { description: 'Small text shown above the headline in the hero.' },
    },
    {
      name: 'heroHeadline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Toys. Imagination. Community.',
    },
    {
      name: 'heroTagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'Borrow quality toys for your child\'s world — sustainably, affordably, together.',
    },
    {
      name: 'heroCTALabel',
      type: 'text',
      label: 'CTA Button Label',
      defaultValue: 'Join Now',
    },
    {
      name: 'heroCTAHref',
      type: 'text',
      label: 'CTA Button Link',
      defaultValue: '/#membership',
    },
    {
      name: 'scrollLabel',
      type: 'text',
      label: 'Scroll indicator label',
      defaultValue: 'Scroll',
      admin: { description: 'Small vertical text shown in the bottom-right of the hero.' },
    },

    // ── Location ─────────────────────────────────────────────
    {
      name: 'locationSection',
      type: 'group',
      label: 'Location Section',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section label',
          defaultValue: 'Find Us',
          admin: { description: 'Small uppercase eyebrow text shown above the heading' },
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'We\'re in Kenmore',
        },
        {
          name: 'street',
          type: 'text',
          label: 'Street Address',
          defaultValue: '8 Brookfield Road',
        },
        {
          name: 'suburb',
          type: 'text',
          defaultValue: 'Kenmore',
        },
        {
          name: 'state',
          type: 'text',
          label: 'State',
          defaultValue: 'QLD',
        },
        {
          name: 'postcode',
          type: 'text',
          defaultValue: '4069',
        },
        {
          name: 'openingHoursLabel',
          type: 'text',
          label: 'Opening hours heading',
          defaultValue: 'Opening Hours',
        },
        {
          name: 'openingHours',
          type: 'array',
          label: 'Opening Hours',
          admin: { description: 'e.g. Saturday / 9:00 am – 12:00 pm' },
          fields: [
            { name: 'day',   type: 'text', required: true },
            { name: 'hours', type: 'text', required: true },
          ],
        },
        {
          name: 'directionsLabel',
          type: 'text',
          label: 'Directions button label',
          defaultValue: 'Get Directions →',
        },
        {
          name: 'directionsUrl',
          type: 'text',
          label: 'Google Maps Directions URL',
          admin: {
            description: 'Link to open Google Maps directions to the library',
          },
        },
        {
          name: 'mapsLabel',
          type: 'text',
          label: '"View on Google Maps" link label',
          defaultValue: 'View on Google Maps',
        },
        {
          name: 'mapEmbedUrl',
          type: 'text',
          label: 'Google Maps Embed URL',
          admin: {
            description: 'In Google Maps: Share → Embed a map → copy the src="..." URL',
          },
        },
      ],
    },

    // ── About ────────────────────────────────────────────────
    {
      name: 'aboutSection',
      type: 'group',
      label: 'What Is a Toy Library?',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section label',
          defaultValue: 'About',
          admin: { description: 'Small uppercase eyebrow text shown above the heading' },
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'More toys. Less clutter. More community.',
        },
        {
          name: 'body',
          type: 'textarea',
          defaultValue:
            'A toy library is exactly what it sounds like — a library for toys. Members pay a small annual fee and borrow quality educational toys, puzzles, games, and outdoor equipment, returning them when their child is ready for something new.',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Feature badges',
          admin: { description: 'Small icon + label badges shown below the body text.' },
          fields: [
            { name: 'icon',  type: 'text', required: true, admin: { description: 'Emoji, e.g. 🪀' } },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },

    // ── How It Works ─────────────────────────────────────────
    {
      name: 'howItWorksSection',
      type: 'group',
      label: 'How It Works',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section label',
          defaultValue: 'Simple Process',
          admin: { description: 'Small uppercase eyebrow text shown above the heading' },
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'How It Works',
        },
        {
          name: 'steps',
          type: 'array',
          maxRows: 3,
          admin: { description: 'Exactly 3 steps displayed side-by-side' },
          fields: [
            { name: 'image',   type: 'upload', relationTo: 'media', admin: { description: 'Circular step photo' } },
            { name: 'heading', type: 'text', required: true },
            { name: 'body',    type: 'text', required: true },
          ],
        },
      ],
    },

    // ── Membership (home page preview) ───────────────────────
    {
      name: 'membershipSection',
      type: 'group',
      label: 'Membership Section',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section label',
          defaultValue: 'Membership',
          admin: { description: 'Small uppercase eyebrow text shown above the heading' },
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Simple, affordable membership',
        },
        {
          name: 'subheading',
          type: 'text',
          defaultValue: 'One annual fee. Unlimited borrowing. No hidden costs. Concession rates available.',
        },
        {
          name: 'popularBadge',
          type: 'text',
          label: '"Most Popular" badge text',
          defaultValue: 'Most Popular',
        },
        {
          name: 'disclaimer',
          type: 'text',
          label: 'Small print disclaimer',
          defaultValue: 'Lost or damaged toys may incur a replacement fee. See our T&Cs for details.',
        },
      ],
    },

    // ── FAQ ──────────────────────────────────────────────────
    {
      name: 'faqSection',
      type: 'group',
      label: 'FAQ Section',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section label',
          defaultValue: 'Help',
          admin: { description: 'Small uppercase eyebrow text shown above the heading' },
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Frequently Asked Questions',
        },
      ],
    },

    // ── News preview ─────────────────────────────────────────
    {
      name: 'newsSection',
      type: 'group',
      label: 'News Preview Section',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section label',
          defaultValue: 'Latest News',
          admin: { description: 'Small uppercase eyebrow text shown above the heading' },
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: "What's On",
        },
        {
          name: 'allNewsLabel',
          type: 'text',
          label: '"All news" link label',
          defaultValue: 'All news →',
        },
      ],
    },

    // ── Contact ──────────────────────────────────────────────
    {
      name: 'contactSection',
      type: 'group',
      label: 'Contact Section',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section label',
          defaultValue: 'Get In Touch',
          admin: { description: 'Small uppercase eyebrow text shown above the heading' },
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'We\'d love to hear from you',
        },
        {
          name: 'intro',
          type: 'text',
          defaultValue: 'Questions about membership, toys, or volunteering? Drop us a line.',
        },
        {
          name: 'formHeading',
          type: 'text',
          label: 'Contact form heading',
          defaultValue: 'Send us a message',
        },
        {
          name: 'formEnabled',
          type: 'checkbox',
          label: 'Enable contact form',
          defaultValue: false,
          admin: { description: 'Requires Resend API key (Phase 5)' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/')
        } catch {}
      },
    ],
  },
}
