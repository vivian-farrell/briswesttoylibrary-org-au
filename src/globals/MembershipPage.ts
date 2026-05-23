import type { GlobalConfig } from 'payload'

export const MembershipPage: GlobalConfig = {
  slug: 'membership-page',
  label: 'Membership Page',
  admin: { group: 'Content' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Join Brisbane West Toy Library',
    },
    {
      name: 'intro',
      type: 'richText',
    },
    {
      name: 'tiers',
      type: 'array',
      label: 'Membership Tiers',
      admin: { description: 'Displayed as cards on the home page and membership page' },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          admin: { description: 'Annual price in AUD (whole dollars)' },
        },
        {
          name: 'description',
          type: 'text',
          admin: { description: 'e.g. "Pension / Health Care Card holders"' },
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            { name: 'feature', type: 'text', required: true },
          ],
        },
        {
          name: 'isFeatured',
          type: 'checkbox',
          label: 'Highlight as most popular',
          defaultValue: false,
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Button label',
          defaultValue: 'Join Now',
        },
      ],
    },
    {
      name: 'note',
      type: 'text',
      label: 'Small print note',
      defaultValue: 'Lost or damaged toys may incur a replacement fee. See our T&Cs for details.',
    },
    {
      name: 'termsAndConditions',
      type: 'richText',
      label: 'Terms & Conditions',
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/')
          revalidatePath('/join')
        } catch {}
      },
    ],
  },
}
