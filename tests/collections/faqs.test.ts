import { describe, it, expect, afterAll } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'
import { makeRichText, richTextToPlain } from '../helpers/richtext.ts'

const createdIds: (string | number)[] = []

afterAll(async () => {
  const payload = await getTestPayload()
  for (const id of createdIds) {
    await payload.delete({ collection: 'faqs', id, overrideAccess: true }).catch(() => null)
  }
})

describe('FAQs collection — field persistence', () => {
  it('saves question, category, and order fields', async () => {
    const payload = await getTestPayload()
    const doc = await payload.create({
      collection: 'faqs',
      data: {
        question: 'How do I join?',
        answer: makeRichText('Visit us on a session day.'),
        category: 'membership',
        order: 1,
      },
    })
    createdIds.push(doc.id)

    const fetched = await payload.findByID({
      collection: 'faqs',
      id: doc.id,
      overrideAccess: true,
    })
    expect(fetched.question).toBe('How do I join?')
    expect(fetched.category).toBe('membership')
    expect(fetched.order).toBe(1)
  })

  it('persists rich-text answer field', async () => {
    const payload = await getTestPayload()
    const doc = await payload.create({
      collection: 'faqs',
      data: {
        question: 'What toys are available?',
        answer: makeRichText('We have puzzles, games, and outdoor equipment.'),
        category: 'toys',
        order: 2,
      },
    })
    createdIds.push(doc.id)

    const fetched = await payload.findByID({
      collection: 'faqs',
      id: doc.id,
      overrideAccess: true,
    })
    expect(richTextToPlain(fetched.answer)).toBe('We have puzzles, games, and outdoor equipment.')
  })

  it('supports all category select values', async () => {
    const payload = await getTestPayload()
    const categories = ['membership', 'borrowing', 'toys', 'volunteering', 'general'] as const

    for (const category of categories) {
      const doc = await payload.create({
        collection: 'faqs',
        data: {
          question: `FAQ for ${category}`,
          answer: makeRichText(`Answer for ${category}`),
          category,
        },
      })
      createdIds.push(doc.id)
      expect(doc.category).toBe(category)
    }
  })

  it('defaults order to 0 when not provided', async () => {
    const payload = await getTestPayload()
    const doc = await payload.create({
      collection: 'faqs',
      data: {
        question: 'Default order FAQ',
        answer: makeRichText('Some answer.'),
      },
    })
    createdIds.push(doc.id)
    expect(doc.order).toBe(0)
  })
})

describe('FAQs collection — rendering data shape', () => {
  it('FAQ page query returns all FAQs sorted by order', async () => {
    const payload = await getTestPayload()

    const low = await payload.create({
      collection: 'faqs',
      data: {
        question: 'Order 10 FAQ',
        answer: makeRichText('Lower priority.'),
        category: 'general',
        order: 10,
      },
    })
    const high = await payload.create({
      collection: 'faqs',
      data: {
        question: 'Order 1 FAQ',
        answer: makeRichText('Higher priority.'),
        category: 'general',
        order: 1,
      },
    })
    createdIds.push(low.id, high.id)

    const result = await payload.find({
      collection: 'faqs',
      overrideAccess: true,
      limit: 100,
      sort: 'order',
    })

    const orders = result.docs.map((d) => d.order ?? 0)
    for (let i = 1; i < orders.length; i++) {
      expect(orders[i]).toBeGreaterThanOrEqual(orders[i - 1])
    }

    result.docs.forEach((doc) => {
      expect(typeof doc.question).toBe('string')
      expect(doc).toHaveProperty('answer')
      expect(doc).toHaveProperty('category')
      expect(doc).toHaveProperty('order')
    })
  })
})
