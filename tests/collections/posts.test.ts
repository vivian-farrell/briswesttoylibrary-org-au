import { describe, it, expect, afterAll } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'
import { makeRichText, richTextToPlain } from '../helpers/richtext.ts'

const createdIds: (string | number)[] = []

afterAll(async () => {
  const payload = await getTestPayload()
  for (const id of createdIds) {
    await payload.delete({ collection: 'posts', id, overrideAccess: true }).catch(() => null)
  }
})

describe('Posts collection — field persistence', () => {
  it('saves all scalar fields (title, slug, status, category, excerpt)', async () => {
    const payload = await getTestPayload()
    const doc = await payload.create({
      collection: 'posts',
      data: {
        title: 'Test Post Title',
        slug: 'test-post-title',
        status: 'published',
        category: 'news',
        excerpt: 'A short summary of the test post.',
      },
    })
    createdIds.push(doc.id)

    expect(doc.title).toBe('Test Post Title')
    expect(doc.slug).toBe('test-post-title')
    expect(doc.status).toBe('published')
    expect(doc.category).toBe('news')
    expect(doc.excerpt).toBe('A short summary of the test post.')
  })

  it('persists a rich-text content field', async () => {
    const payload = await getTestPayload()
    const content = makeRichText('Hello from the post body.')
    const doc = await payload.create({
      collection: 'posts',
      data: {
        title: 'Post With Content',
        slug: 'post-with-content',
        status: 'published',
        content,
      },
    })
    createdIds.push(doc.id)

    const fetched = await payload.findByID({
      collection: 'posts',
      id: doc.id,
      overrideAccess: true,
    })
    expect(richTextToPlain(fetched.content)).toBe('Hello from the post body.')
  })

  it('persists the publishedAt date field', async () => {
    const payload = await getTestPayload()
    const ts = '2026-01-15T10:00:00.000Z'
    const doc = await payload.create({
      collection: 'posts',
      data: {
        title: 'Dated Post',
        slug: 'dated-post',
        status: 'published',
        publishedAt: ts,
      },
    })
    createdIds.push(doc.id)

    const fetched = await payload.findByID({
      collection: 'posts',
      id: doc.id,
      overrideAccess: true,
    })
    expect(fetched.publishedAt).toBe(ts)
  })

  it('supports all category select values', async () => {
    const payload = await getTestPayload()
    const categories = ['news', 'event', 'volunteer', 'announcement'] as const

    for (const category of categories) {
      const doc = await payload.create({
        collection: 'posts',
        data: {
          title: `Post Category ${category}`,
          slug: `post-category-${category}`,
          status: 'published',
          category,
        },
      })
      createdIds.push(doc.id)
      expect(doc.category).toBe(category)
    }
  })
})

describe('Posts collection — access control', () => {
  it('hides draft posts when access control is explicitly enforced (overrideAccess: false)', async () => {
    const payload = await getTestPayload()
    const draft = await payload.create({
      collection: 'posts',
      data: {
        title: 'Draft Post',
        slug: 'draft-post-access-test',
        status: 'draft',
      },
    })
    createdIds.push(draft.id)

    // The Payload local API bypasses access control by default.
    // Pass overrideAccess: false to simulate an unauthenticated REST request.
    const result = await payload.find({
      collection: 'posts',
      where: { slug: { equals: 'draft-post-access-test' } },
      overrideAccess: false,
    })
    expect(result.docs).toHaveLength(0)
  })

  it('returns draft posts via local API (default local-API behaviour, trusted server-side)', async () => {
    const payload = await getTestPayload()
    // No overrideAccess → local API bypasses access control → draft visible
    const result = await payload.find({
      collection: 'posts',
      where: { slug: { equals: 'draft-post-access-test' } },
    })
    expect(result.docs).toHaveLength(1)
    expect(result.docs[0].status).toBe('draft')
  })
})

describe('Posts collection — rendering data shape', () => {
  it('home page query returns published posts sorted by publishedAt desc', async () => {
    const payload = await getTestPayload()

    const older = await payload.create({
      collection: 'posts',
      data: {
        title: 'Older Post',
        slug: 'render-older',
        status: 'published',
        publishedAt: '2026-01-01T00:00:00.000Z',
      },
    })
    const newer = await payload.create({
      collection: 'posts',
      data: {
        title: 'Newer Post',
        slug: 'render-newer',
        status: 'published',
        publishedAt: '2026-03-01T00:00:00.000Z',
      },
    })
    createdIds.push(older.id, newer.id)

    // Mirrors the exact query used on the home page
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 3,
    })

    const slugs = result.docs.map((d) => d.slug)
    const olderIdx = slugs.indexOf('render-older')
    const newerIdx = slugs.indexOf('render-newer')
    expect(newerIdx).toBeLessThan(olderIdx) // newer first
    result.docs.forEach((d) => {
      expect(d.status).toBe('published')
      expect(d).toHaveProperty('title')
      expect(d).toHaveProperty('slug')
    })
  })

  it('news listing query returns expected fields for post cards', async () => {
    const payload = await getTestPayload()
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 20,
    })

    result.docs.forEach((doc) => {
      expect(typeof doc.title).toBe('string')
      expect(typeof doc.slug).toBe('string')
      // excerpt and publishedAt may be null — verify they exist as keys
      expect(doc).toHaveProperty('excerpt')
      expect(doc).toHaveProperty('publishedAt')
      expect(doc).toHaveProperty('category')
    })
  })
})
