import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  fields: [
    {
      name: 'comingSoon',
      type: 'checkbox',
      label: 'Coming Soon mode',
      defaultValue: false,
      admin: {
        description: 'When enabled, all public pages show a "Coming Soon" holding page. The /admin panel is unaffected.',
      },
    },
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Brisbane West Toy Library',
      required: true,
      admin: { description: 'Used in browser-tab titles and page metadata' },
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Toys. Imagination. Community.',
      admin: { description: 'Used as the default meta description for search results' },
    },
    {
      name: 'email',
      type: 'email',
      admin: { description: 'Shown in the home page Contact section' },
    },
    {
      name: 'phone',
      type: 'text',
      admin: { description: 'Shown in the home page Contact section' },
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'facebook',  type: 'text', label: 'Facebook URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
      ],
    },
    {
      name: 'setlsCatalogueUrl',
      type: 'text',
      label: 'SETLS Catalogue URL',
      admin: { description: 'Full URL to the SETLS online toy catalogue for members' },
    },
    {
      name: 'setlsCalendarUrl',
      type: 'text',
      label: 'SETLS Calendar URL',
      admin: { description: 'Full URL to the SETLS volunteer shift calendar' },
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
