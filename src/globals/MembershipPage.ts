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
          required: false,
          admin: { description: 'Legacy — no longer displayed. Use the 6 & 12 month prices below.' },
        },
        {
          name: 'price6Month',
          type: 'number',
          label: '6 Month Price (AUD)',
        },
        {
          name: 'price12Month',
          type: 'number',
          label: '12 Month Price (AUD)',
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
      name: 'trial',
      type: 'group',
      label: '6-Week Trial',
      fields: [
        { name: 'name', type: 'text', defaultValue: '6 Week Trial' },
        { name: 'price', type: 'number', defaultValue: 20, label: 'Trial Price (AUD)' },
        { name: 'bondPrice', type: 'number', defaultValue: 20, label: 'Refundable Bond (AUD)' },
        { name: 'bondNote', type: 'text', defaultValue: 'Fully refundable when toys are returned' },
        { name: 'description', type: 'text' },
        {
          name: 'features',
          type: 'array',
          fields: [
            { name: 'feature', type: 'text', required: true },
          ],
        },
        { name: 'ctaLabel', type: 'text', defaultValue: 'Start Your Trial', label: 'Button label' },
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
