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
      defaultValue: '/join',
    },

    // ── Location ─────────────────────────────────────────────
    {
      name: 'locationSection',
      type: 'group',
      label: 'Location Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'We\'re in Kenmore',
        },
        {
          name: 'mapEmbedUrl',
          type: 'text',
          label: 'Google Maps Embed URL',
          admin: {
            description: 'In Google Maps: Share → Embed a map → copy the src="..." URL',
          },
        },
        {
          name: 'directionsUrl',
          type: 'text',
          label: 'Google Maps Directions URL',
          admin: {
            description: 'Link to open Google Maps directions to the library',
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
      ],
    },

    // ── How It Works ─────────────────────────────────────────
    {
      name: 'howItWorksSection',
      type: 'group',
      label: 'How It Works',
      fields: [
        {
          name: 'steps',
          type: 'array',
          maxRows: 3,
          admin: { description: 'Exactly 3 steps displayed side-by-side' },
          fields: [
            { name: 'icon',    type: 'text', admin: { description: 'Emoji, e.g. 📋' } },
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
          name: 'heading',
          type: 'text',
          defaultValue: 'Simple, affordable membership',
        },
        {
          name: 'subheading',
          type: 'text',
          defaultValue: 'One annual fee. Unlimited borrowing. No hidden costs. Concession rates available.',
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
          name: 'heading',
          type: 'text',
          defaultValue: 'We\'d love to hear from you',
        },
        {
          name: 'intro',
          type: 'text',
          defaultValue: 'Questions about membership, toys, or volunteering? Drop us a line.',
        },
      ],
    },
  ],
}
