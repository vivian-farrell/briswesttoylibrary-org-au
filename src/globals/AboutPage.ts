import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: { group: 'Content' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'About Brisbane West Toy Library',
    },
    {
      name: 'intro',
      type: 'textarea',
      defaultValue:
        'Brisbane West Toy Library is a community-run toy library in Kenmore, Brisbane, serving families across the western suburbs.',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
