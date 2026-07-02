import { describe, it, expect } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'
import { makeRichText, richTextToPlain } from '../helpers/richtext.ts'

describe('MembershipPage global — field persistence', () => {
  it('saves heading text field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'membership-page',
      data: { heading: 'Join Brisbane West Toy Library' },
    })
    const result = await payload.findGlobal({ slug: 'membership-page' })
    expect(result.heading).toBe('Join Brisbane West Toy Library')
  })

  it('saves intro rich-text field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'membership-page',
      data: { intro: makeRichText('Welcome to our toy library membership page.') },
    })
    const result = await payload.findGlobal({ slug: 'membership-page' })
    expect(richTextToPlain(result.intro)).toBe('Welcome to our toy library membership page.')
  })

  it('saves note field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'membership-page',
      data: { note: 'Lost toys incur a replacement fee.' },
    })
    const result = await payload.findGlobal({ slug: 'membership-page' })
    expect(result.note).toBe('Lost toys incur a replacement fee.')
  })

  it('saves termsAndConditions rich-text field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'membership-page',
      data: { termsAndConditions: makeRichText('By joining you agree to our terms.') },
    })
    const result = await payload.findGlobal({ slug: 'membership-page' })
    expect(richTextToPlain(result.termsAndConditions)).toBe('By joining you agree to our terms.')
  })

  it('saves tiers array with nested features', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'membership-page',
      data: {
        tiers: [
          {
            name: 'Standard',
            price: 95,
            description: 'For most families',
            features: [
              { feature: 'Borrow up to 6 toys' },
              { feature: 'Access all sessions' },
            ],
            isFeatured: true,
            ctaLabel: 'Join Now',
          },
          {
            name: 'Concession',
            price: 55,
            description: 'Pension / Health Care Card holders',
            features: [
              { feature: 'Same access as Standard' },
            ],
            isFeatured: false,
            ctaLabel: 'Join Now',
          },
        ],
      },
    })
    const result = await payload.findGlobal({ slug: 'membership-page' })
    const tiers = result.tiers as Array<{
      name: string
      price: number
      description: string
      features: Array<{ feature: string }>
      isFeatured: boolean
      ctaLabel: string
    }>

    expect(tiers).toHaveLength(2)

    expect(tiers[0].name).toBe('Standard')
    expect(tiers[0].price).toBe(95)
    expect(tiers[0].description).toBe('For most families')
    expect(tiers[0].isFeatured).toBe(true)
    expect(tiers[0].ctaLabel).toBe('Join Now')
    expect(tiers[0].features).toHaveLength(2)
    expect(tiers[0].features[0].feature).toBe('Borrow up to 6 toys')
    expect(tiers[0].features[1].feature).toBe('Access all sessions')

    expect(tiers[1].name).toBe('Concession')
    expect(tiers[1].price).toBe(55)
    expect(tiers[1].isFeatured).toBe(false)
    expect(tiers[1].features).toHaveLength(1)
    expect(tiers[1].features[0].feature).toBe('Same access as Standard')
  })

  it('renders onto site: tiers shape matches what MembershipSection expects', async () => {
    const payload = await getTestPayload()
    const mp = await payload.findGlobal({ slug: 'membership-page' })
    const tiers = (mp.tiers ?? []) as Array<{
      name: string
      price: number
      isFeatured: boolean
      ctaLabel: string
    }>
    tiers.forEach((tier) => {
      expect(typeof tier.name).toBe('string')
      expect(typeof tier.isFeatured).toBe('boolean')
    })
  })

  it('saves tiers.price6Month and tiers.price12Month', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'membership-page',
      data: {
        tiers: [
          {
            name: 'Standard',
            price6Month: 75,
            price12Month: 130,
            features: [{ feature: 'Borrow up to 5 toys' }],
            ctaLabel: 'Join Now',
          },
          {
            name: 'Concession',
            price6Month: 55,
            price12Month: 95,
            features: [{ feature: 'Borrow up to 5 toys' }],
            ctaLabel: 'Join Now',
          },
        ],
      },
    })
    const result = await payload.findGlobal({ slug: 'membership-page' })
    const tiers = result.tiers as Array<{ name: string; price6Month: number; price12Month: number }>

    expect(tiers).toHaveLength(2)
    expect(tiers[0].name).toBe('Standard')
    expect(tiers[0].price6Month).toBe(75)
    expect(tiers[0].price12Month).toBe(130)
    expect(tiers[1].name).toBe('Concession')
    expect(tiers[1].price6Month).toBe(55)
    expect(tiers[1].price12Month).toBe(95)
  })
})

describe('MembershipPage global — trial group', () => {
  it('saves name, price, bondPrice, bondNote, description, ctaLabel', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'membership-page',
      data: {
        trial: {
          name: '6 Week Trial',
          price: 20,
          bondPrice: 20,
          bondNote: 'Fully refundable when toys are returned',
          description: 'Try us out before committing',
          ctaLabel: 'Start Your Trial',
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'membership-page' })
    const trial = result.trial as {
      name: string
      price: number
      bondPrice: number
      bondNote: string
      description: string
      ctaLabel: string
    }

    expect(trial.name).toBe('6 Week Trial')
    expect(trial.price).toBe(20)
    expect(trial.bondPrice).toBe(20)
    expect(trial.bondNote).toBe('Fully refundable when toys are returned')
    expect(trial.description).toBe('Try us out before committing')
    expect(trial.ctaLabel).toBe('Start Your Trial')
  })

  it('saves trial.features array', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'membership-page',
      data: {
        trial: {
          features: [
            { feature: 'Borrow up to 5 toys at a time' },
            { feature: 'Access to all toy categories' },
          ],
        },
      },
    })
    const result = await payload.findGlobal({ slug: 'membership-page' })
    const trial = result.trial as { features: Array<{ feature: string }> }

    expect(trial.features).toHaveLength(2)
    expect(trial.features[0].feature).toBe('Borrow up to 5 toys at a time')
    expect(trial.features[1].feature).toBe('Access to all toy categories')
  })
})
