import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Settings' },
  fields: [
    {
      name: 'acknowledgement',
      type: 'textarea',
      label: 'Acknowledgement of Country',
      defaultValue:
        'Brisbane West Toy Library acknowledges the Traditional Custodians of the land on which we meet and play — the Turrbal and Yuggera peoples — and pays respect to their Elders past, present, and emerging.',
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: 'Brisbane West Toy Library Inc.',
    },
    {
      name: 'exploreLinks',
      type: 'array',
      label: 'Explore column links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href',  type: 'text', required: true },
      ],
    },
    {
      name: 'involvedLinks',
      type: 'array',
      label: 'Get Involved column links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href',  type: 'text', required: true },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/', 'layout')
        } catch {}
      },
    ],
  },
}
