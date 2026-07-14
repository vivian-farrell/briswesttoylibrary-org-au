import type { GlobalConfig } from 'payload'

export const ToysPage: GlobalConfig = {
  slug: 'toys-page',
  label: 'Toys Page',
  admin: { group: 'Content' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Section label',
      defaultValue: 'Toy Catalogue',
      admin: { description: 'Small uppercase eyebrow text shown above the heading' },
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Our Toys',
    },
    {
      name: 'intro',
      type: 'textarea',
      defaultValue:
        'We stock hundreds of quality educational toys, puzzles, games, and outdoor equipment — updated regularly with new additions.',
    },
    {
      name: 'catalogueCardHeading',
      type: 'text',
      label: 'Catalogue card heading',
      defaultValue: 'Browse the Catalogue',
    },
    {
      name: 'catalogueCardBody',
      type: 'textarea',
      label: 'Catalogue card body',
      defaultValue:
        'Our full toy catalogue is hosted on SETLS, the platform we use to manage borrowing. Members can log in to place reservations.',
    },
    {
      name: 'catalogueCtaLabel',
      type: 'text',
      label: 'Catalogue button label',
      defaultValue: 'Open Toy Catalogue →',
      admin: { description: 'Button linking to the SETLS catalogue URL from Site Settings' },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature cards',
      admin: { description: 'Three cards shown below the catalogue card' },
      fields: [
        { name: 'icon', type: 'text', required: true, admin: { description: 'Emoji, e.g. 🎯' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'text', required: true },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/toys')
        } catch {}
      },
    ],
  },
}
