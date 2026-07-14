import { describe, it, expect } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'

describe('NewsPage global — field persistence', () => {
  it('saves sectionLabel, heading, and emptyStateText fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'news-page',
      data: {
        sectionLabel: 'Latest',
        heading: 'News & Announcements',
        emptyStateText: 'No posts yet — check back soon!',
      },
    })
    const result = await payload.findGlobal({ slug: 'news-page' })
    expect(result.sectionLabel).toBe('Latest')
    expect(result.heading).toBe('News & Announcements')
    expect(result.emptyStateText).toBe('No posts yet — check back soon!')
  })

  it('renders onto site: has all fields the /news page expects', async () => {
    const payload = await getTestPayload()
    const np = await payload.findGlobal({ slug: 'news-page' })
    expect(np).toHaveProperty('sectionLabel')
    expect(np).toHaveProperty('heading')
    expect(np).toHaveProperty('emptyStateText')
  })
})
