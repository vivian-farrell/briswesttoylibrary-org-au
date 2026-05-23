import type { GlobalConfig } from 'payload'

export const VolunteerPage: GlobalConfig = {
  slug: 'volunteer-page',
  label: 'Volunteer Page',
  admin: { group: 'Content' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Volunteer With Us',
    },
    {
      name: 'intro',
      type: 'textarea',
      defaultValue:
        'Brisbane West Toy Library is run entirely by volunteers. We need a small amount of help from our members to keep the library going.',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'roles',
      type: 'array',
      label: 'Volunteer Roles',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'commitment', type: 'text', admin: { description: 'e.g. "2 hours per month"' } },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Button Label',
      defaultValue: 'Express Your Interest',
    },
    {
      name: 'ctaEmail',
      type: 'email',
      label: 'CTA Email Address',
      admin: { description: 'mailto link target for the volunteer interest button' },
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/volunteer')
        } catch {}
      },
    ],
  },
}
