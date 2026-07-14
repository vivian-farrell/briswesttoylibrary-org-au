import type { GlobalConfig } from 'payload'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  label: 'News Page',
  admin: { group: 'Content' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Section label',
      defaultValue: 'Latest',
      admin: { description: 'Small uppercase eyebrow text shown above the heading' },
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'News & Announcements',
    },
    {
      name: 'emptyStateText',
      type: 'text',
      label: 'Empty state text',
      defaultValue: 'No posts yet — check back soon!',
      admin: { description: 'Shown when there are no published posts' },
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/news')
        } catch {}
      },
    ],
  },
}
