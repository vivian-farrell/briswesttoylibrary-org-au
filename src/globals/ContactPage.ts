import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: { group: 'Content' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Get In Touch',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'formEnabled',
      type: 'checkbox',
      label: 'Enable contact form',
      defaultValue: false,
      admin: {
        description: 'Requires Resend API key (Phase 5)',
      },
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
