import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Brisbane West Toy Library',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Toys. Imagination. Community.',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'suburb', type: 'text', defaultValue: 'Kenmore' },
        { name: 'state',  type: 'text', defaultValue: 'QLD' },
        { name: 'postcode', type: 'text', defaultValue: '4069' },
      ],
    },
    {
      name: 'openingHours',
      type: 'array',
      admin: { description: 'e.g. Saturday / 9:00 am – 12:00 pm' },
      fields: [
        { name: 'day',   type: 'text', required: true },
        { name: 'hours', type: 'text', required: true },
      ],
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
  ],
}
