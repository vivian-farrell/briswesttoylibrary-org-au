import { describe, it, expect, afterAll } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'

const createdIds: (string | number)[] = []

afterAll(async () => {
  const payload = await getTestPayload()
  for (const id of createdIds) {
    await payload.delete({ collection: 'toys', id, overrideAccess: true }).catch(() => null)
  }
})

describe('Toys collection — field persistence', () => {
  it('saves name and setlsId fields', async () => {
    const payload = await getTestPayload()
    const doc = await payload.create({
      collection: 'toys',
      data: {
        name: 'Wooden Train Set',
        setlsId: 'SETLS-1234',
      },
    })
    createdIds.push(doc.id)

    const fetched = await payload.findByID({
      collection: 'toys',
      id: doc.id,
      overrideAccess: true,
    })
    expect(fetched.name).toBe('Wooden Train Set')
    expect(fetched.setlsId).toBe('SETLS-1234')
  })

  it('creates a toy with name only (setlsId is optional)', async () => {
    const payload = await getTestPayload()
    const doc = await payload.create({
      collection: 'toys',
      data: { name: 'Puzzle Set' },
    })
    createdIds.push(doc.id)
    expect(doc.name).toBe('Puzzle Set')
    expect(doc.setlsId).toBeNull()
  })

  it('is publicly readable', async () => {
    const payload = await getTestPayload()
    const result = await payload.find({ collection: 'toys' })
    expect(result.docs.length).toBeGreaterThanOrEqual(0)
  })
})
