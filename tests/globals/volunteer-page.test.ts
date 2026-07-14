import { describe, it, expect } from 'vitest'
import { getTestPayload } from '../helpers/payload.ts'
import { makeRichText, richTextToPlain } from '../helpers/richtext.ts'

describe('VolunteerPage global — field persistence', () => {
  it('saves sectionLabel, rolesHeading, and calendarLabel fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'volunteer-page',
      data: {
        sectionLabel: 'Volunteering',
        rolesHeading: 'Ways to Help',
        calendarLabel: 'See the Shift Calendar →',
      },
    })
    const result = await payload.findGlobal({ slug: 'volunteer-page' })
    expect(result.sectionLabel).toBe('Volunteering')
    expect(result.rolesHeading).toBe('Ways to Help')
    expect(result.calendarLabel).toBe('See the Shift Calendar →')
  })

  it('saves heading and intro fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'volunteer-page',
      data: {
        heading: 'Volunteer With Us',
        intro: 'We run entirely on volunteer effort.',
      },
    })
    const result = await payload.findGlobal({ slug: 'volunteer-page' })
    expect(result.heading).toBe('Volunteer With Us')
    expect(result.intro).toBe('We run entirely on volunteer effort.')
  })

  it('saves content rich-text field', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'volunteer-page',
      data: { content: makeRichText('Volunteering is rewarding and fun.') },
    })
    const result = await payload.findGlobal({ slug: 'volunteer-page' })
    expect(richTextToPlain(result.content)).toBe('Volunteering is rewarding and fun.')
  })

  it('saves ctaLabel and ctaEmail fields', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'volunteer-page',
      data: {
        ctaLabel: 'Express Your Interest',
        ctaEmail: 'volunteer@example.org',
      },
    })
    const result = await payload.findGlobal({ slug: 'volunteer-page' })
    expect(result.ctaLabel).toBe('Express Your Interest')
    expect(result.ctaEmail).toBe('volunteer@example.org')
  })

  it('saves roles array with title, description, and commitment', async () => {
    const payload = await getTestPayload()
    await payload.updateGlobal({
      slug: 'volunteer-page',
      data: {
        roles: [
          {
            title: 'Session Helper',
            description: 'Help members borrow and return toys on session days.',
            commitment: '2 hours per fortnight',
          },
          {
            title: 'Committee Member',
            description: 'Help run the library at a strategic level.',
            commitment: '3 hours per month',
          },
        ],
      },
    })
    const result = await payload.findGlobal({ slug: 'volunteer-page' })
    const roles = result.roles as Array<{
      title: string
      description: string
      commitment: string
    }>

    expect(roles).toHaveLength(2)
    expect(roles[0].title).toBe('Session Helper')
    expect(roles[0].description).toBe('Help members borrow and return toys on session days.')
    expect(roles[0].commitment).toBe('2 hours per fortnight')
    expect(roles[1].title).toBe('Committee Member')
    expect(roles[1].commitment).toBe('3 hours per month')
  })

  it('renders onto site: volunteer page has all fields the component expects', async () => {
    const payload = await getTestPayload()
    const vp = await payload.findGlobal({ slug: 'volunteer-page' })
    expect(vp).toHaveProperty('sectionLabel')
    expect(vp).toHaveProperty('heading')
    expect(vp).toHaveProperty('intro')
    expect(vp).toHaveProperty('content')
    expect(vp).toHaveProperty('rolesHeading')
    expect(vp).toHaveProperty('roles')
    expect(vp).toHaveProperty('calendarLabel')
    expect(vp).toHaveProperty('ctaLabel')
    expect(vp).toHaveProperty('ctaEmail')

    // roles is an array (may be empty on fresh DB before this test updates it)
    expect(Array.isArray(vp.roles ?? [])).toBe(true)
  })
})
