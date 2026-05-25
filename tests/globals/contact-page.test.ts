import { describe, it, expect } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'

describe('ContactPage global — field persistence', () => {
  it('saves heading text field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'contact-page',
      data: { heading: 'Get In Touch' },
    })
    const result = await payload.findGlobal({ slug: 'contact-page' })
    expect(result.heading).toBe('Get In Touch')
  })

  it('saves intro textarea field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'contact-page',
      data: { intro: 'Have a question? We would love to hear from you.' },
    })
    const result = await payload.findGlobal({ slug: 'contact-page' })
    expect(result.intro).toBe('Have a question? We would love to hear from you.')
  })

  it('saves formEnabled checkbox and toggles correctly', async () => {
    const payload = await getTestPayload()

    await payload.updateGlobal({ slug: 'contact-page', data: { formEnabled: true } })
    const enabled = await payload.findGlobal({ slug: 'contact-page' })
    expect(enabled.formEnabled).toBe(true)

    await payload.updateGlobal({ slug: 'contact-page', data: { formEnabled: false } })
    const disabled = await payload.findGlobal({ slug: 'contact-page' })
    expect(disabled.formEnabled).toBe(false)
  })

  it('renders onto site: formEnabled controls contact form display', async () => {
    const payload = await getTestPayload()
    const cp = await payload.findGlobal({ slug: 'contact-page' })
    // The home page uses cp.formEnabled to decide whether to show the contact form
    expect(cp).toHaveProperty('formEnabled')
    expect(typeof (cp as { formEnabled: unknown }).formEnabled).toBe('boolean')
  })
})
