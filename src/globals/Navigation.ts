import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: { group: 'Settings' },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: { description: 'e.g. /#location or /toys' },
        },
        {
          name: 'isScrollLink',
          type: 'checkbox',
          label: 'Scroll-to-section link',
          defaultValue: false,
          admin: {
            description: 'When on the home page, clicking this scrolls to the section instead of navigating.',
          },
        },
        {
          name: 'isCTA',
          type: 'checkbox',
          label: 'Show as CTA button',
          defaultValue: false,
        },
      ],
    },
  ],
}
