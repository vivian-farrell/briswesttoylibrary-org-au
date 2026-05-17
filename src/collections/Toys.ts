import type { CollectionConfig } from 'payload'

export const Toys: CollectionConfig = {
  slug: 'toys',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    description: 'Stub for SETLS integration — Phase 6',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'setlsId',
      type: 'text',
      label: 'SETLS ID',
      admin: {
        description: 'ID from the SETLS toy library management system',
      },
    },
  ],
}
