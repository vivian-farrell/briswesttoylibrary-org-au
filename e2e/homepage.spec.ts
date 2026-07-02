import { test, expect } from '@playwright/test'

test.describe('homepage CMS wiring', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // ── Hero ──────────────────────────────────────────────────────────────────

  test('hero: headline, tagline, subtitle, CTA label+href, scroll label', async ({ page }) => {
    await expect(page.getByText('E2E Hero Headline')).toBeVisible()
    await expect(page.getByText('E2E Hero Tagline')).toBeVisible()
    await expect(page.getByText('E2E Hero Subtitle')).toBeVisible()
    const cta = page.getByRole('link', { name: 'E2E Join Now' })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '/e2e-join')
    await expect(page.getByText('E2E Scroll')).toBeVisible()
  })

  // ── Location Section ──────────────────────────────────────────────────────

  test('location: section label and heading', async ({ page }) => {
    await expect(page.getByText('E2E Find Us')).toBeVisible()
    await expect(page.getByText('E2E Location Heading')).toBeVisible()
  })

  test('location: opening hours label, day, and hours', async ({ page }) => {
    await expect(page.getByText('E2E Opening Hours Label')).toBeVisible()
    await expect(page.getByText('E2E Location Day')).toBeVisible()
    await expect(page.getByText('E2E Location Hours')).toBeVisible()
  })

  test('location: street and suburb/state/postcode', async ({ page }) => {
    await expect(page.getByText('E2E Location Street')).toBeVisible()
    await expect(page.getByText(/E2ELocSuburb/)).toBeVisible()
    await expect(page.getByText(/E2ELS/)).toBeVisible()
    await expect(page.getByText(/E2ELP/)).toBeVisible()
  })

  test('location: directions label and href', async ({ page }) => {
    const link = page.getByRole('link', { name: 'E2E Get Directions' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', 'https://maps.e2e.example/directions')
  })

  test('location: map iframe src', async ({ page }) => {
    // mapsLabel is only rendered in the fallback state (no mapEmbedUrl).
    // When mapEmbedUrl is seeded the iframe renders instead, so we assert the src.
    await expect(page.locator('iframe')).toHaveAttribute('src', 'https://maps.e2e.example/embed')
  })

  // ── About Section ─────────────────────────────────────────────────────────

  test('about: section label, heading, body', async ({ page }) => {
    await expect(page.getByText('E2E About Label')).toBeVisible()
    await expect(page.getByText('E2E About Heading')).toBeVisible()
    await expect(page.getByText('E2E about body text')).toBeVisible()
  })

  test('about: feature icons and labels', async ({ page }) => {
    await expect(page.getByText('E2E Feature One')).toBeVisible()
    await expect(page.getByText('E2E Feature Two')).toBeVisible()
  })

  // ── How It Works Section ──────────────────────────────────────────────────

  test('how it works: section label and heading', async ({ page }) => {
    await expect(page.getByText('E2E Process Label')).toBeVisible()
    await expect(page.getByText('E2E How It Works')).toBeVisible()
  })

  test('how it works: all three step headings and bodies', async ({ page }) => {
    // Use role-scoped locators: getByText is case-insensitive substring by default,
    // so 'E2E Step One' would also match 'E2E step one body'. Headings are unambiguous.
    await expect(page.getByRole('heading', { name: 'E2E Step One' })).toBeVisible()
    await expect(page.getByText('E2E step one body')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'E2E Step Two' })).toBeVisible()
    await expect(page.getByText('E2E step two body')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'E2E Step Three' })).toBeVisible()
    await expect(page.getByText('E2E step three body')).toBeVisible()
  })

  // ── News Preview Section ──────────────────────────────────────────────────

  test('news preview: section label, heading, all-news label', async ({ page }) => {
    await expect(page.getByText('E2E News Label')).toBeVisible()
    await expect(page.getByText('E2E News Heading')).toBeVisible()
    // Two identical <a> elements exist (one hidden on small screens); .first() picks either visible one
    await expect(page.getByText('E2E All News').first()).toBeVisible()
  })

  test('news preview: seeded post title and excerpt appear', async ({ page }) => {
    await expect(page.getByText('E2E Test Post')).toBeVisible()
    await expect(page.getByText('E2E test excerpt')).toBeVisible()
  })

  // ── Membership Section ────────────────────────────────────────────────────

  test('membership: section label, heading, subheading', async ({ page }) => {
    await expect(page.getByText('E2E Membership Label')).toBeVisible()
    await expect(page.getByText('E2E Membership Heading')).toBeVisible()
    await expect(page.getByText('E2E membership subheading')).toBeVisible()
  })

  test('membership: tier names, prices (12-month default), descriptions', async ({ page }) => {
    // exact: true avoids case-insensitive substring matches against desc/feature/CTA text
    await expect(page.getByRole('heading', { name: 'E2E Standard', exact: true })).toBeVisible()
    await expect(page.getByText(/\$130/)).toBeVisible()
    await expect(page.getByText('E2E standard desc')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'E2E Concession', exact: true })).toBeVisible()
    await expect(page.getByText(/\$95/)).toBeVisible()
    await expect(page.getByText('E2E concession desc')).toBeVisible()
  })

  test('membership: 6-month toggle switches displayed price', async ({ page }) => {
    const standardToggle = page.getByRole('group', { name: 'E2E Standard membership duration' })
    await standardToggle.getByRole('button', { name: '6 months' }).click()
    await expect(page.getByText(/\$75/)).toBeVisible()
  })

  test('membership: popular badge and disclaimer', async ({ page }) => {
    await expect(page.getByText('E2E Popular')).toBeVisible()
    await expect(page.getByText('E2E disclaimer text')).toBeVisible()
  })

  test('membership: tier CTA labels and feature lists', async ({ page }) => {
    await expect(page.getByText('E2E Standard CTA')).toBeVisible()
    await expect(page.getByText('E2E Concession CTA')).toBeVisible()
    await expect(page.getByText('E2E standard feature')).toBeVisible()
    await expect(page.getByText('E2E concession feature')).toBeVisible()
  })

  test('membership: trial card price, bond, and CTA', async ({ page }) => {
    await expect(page.getByText('Try it out')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'E2E Trial', exact: true })).toBeVisible()
    await expect(page.getByText('E2E bond note')).toBeVisible()
    await expect(page.getByText('E2E Trial CTA')).toBeVisible()
  })

  // ── Contact Section ───────────────────────────────────────────────────────

  test('contact: section label, heading, intro, form heading', async ({ page }) => {
    await expect(page.getByText('E2E Contact Label')).toBeVisible()
    await expect(page.getByText('E2E Contact Heading')).toBeVisible()
    await expect(page.getByText('E2E contact intro text')).toBeVisible()
    await expect(page.getByText('E2E Form Heading')).toBeVisible()
  })

  test('contact: email link text and mailto href', async ({ page }) => {
    const emailLink = page.getByRole('link', { name: 'hello@e2e.example' })
    await expect(emailLink).toBeVisible()
    await expect(emailLink).toHaveAttribute('href', 'mailto:hello@e2e.example')
  })

  test('contact: phone visible', async ({ page }) => {
    await expect(page.getByText('07 0000 E2E')).toBeVisible()
  })

  test('contact: site-settings address suburb, state, postcode', async ({ page }) => {
    await expect(page.getByText(/E2ESettSuburb/)).toBeVisible()
    await expect(page.getByText(/E2EState/)).toBeVisible()
    await expect(page.getByText(/E2EP0ST/)).toBeVisible()
  })

  test('contact: facebook and instagram hrefs', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
      'href',
      'https://facebook.com/e2e-test',
    )
    await expect(page.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      'https://instagram.com/e2e-test',
    )
  })
})
