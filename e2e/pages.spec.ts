import { test, expect } from '@playwright/test'

// ── /volunteer ─────────────────────────────────────────────────────────────────

test.describe('/volunteer CMS wiring', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/volunteer')
  })

  test('section label, heading, and intro', async ({ page }) => {
    await expect(page.getByText('E2E Volunteering Label')).toBeVisible()
    await expect(page.getByText('E2E Volunteer Heading')).toBeVisible()
    await expect(page.getByText('E2E volunteer intro')).toBeVisible()
  })

  test('richText content body', async ({ page }) => {
    await expect(page.getByText('E2E volunteer body')).toBeVisible()
  })

  test('roles heading, role title, description, commitment badge', async ({ page }) => {
    await expect(page.getByText('E2E Roles Heading')).toBeVisible()
    await expect(page.getByText('E2E Role Title')).toBeVisible()
    await expect(page.getByText('E2E role desc')).toBeVisible()
    await expect(page.getByText('E2E commitment')).toBeVisible()
  })

  test('CTA label and email href', async ({ page }) => {
    const cta = page.getByRole('link', { name: /E2E Express Interest/ })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', 'mailto:volunteer@e2e.example?subject=Volunteer%20Interest')
  })

  test('SETLS calendar link label and href', async ({ page }) => {
    const link = page.getByRole('link', { name: 'E2E Shift Calendar' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', 'https://setls.e2e.example/calendar')
  })
})

// ── FAQ accordion (home page #faq section — there is no /faq route) ────────────

test.describe('FAQ accordion CMS wiring', () => {
  test('FAQ question is visible and answer revealed on click', async ({ page }) => {
    await page.goto('/#faq')

    const question = page.getByRole('button', { name: 'E2E FAQ Question?' })
    await expect(question).toBeVisible()

    // Answer is hidden inside a collapsed accordion — click to expand
    await question.click()
    await expect(page.getByText('E2E FAQ answer')).toBeVisible()
  })
})

// ── /news ──────────────────────────────────────────────────────────────────────

test.describe('/news CMS wiring', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/news')
  })

  test('news-page global: section label and heading', async ({ page }) => {
    await expect(page.getByText('E2E News Page Label')).toBeVisible()
    await expect(page.getByText('E2E News Page Heading')).toBeVisible()
  })

  test('seeded post title, category badge, and excerpt', async ({ page }) => {
    await expect(page.getByText('E2E Test Post')).toBeVisible()

    // Category 'news' maps to label 'News'
    await expect(page.getByText('News').first()).toBeVisible()

    await expect(page.getByText('E2E test excerpt')).toBeVisible()
  })
})

// ── /toys ──────────────────────────────────────────────────────────────────────

test.describe('/toys CMS wiring', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/toys')
  })

  test('toys-page global: section label, heading, intro', async ({ page }) => {
    await expect(page.getByText('E2E Toys Label')).toBeVisible()
    await expect(page.getByText('E2E Toys Heading')).toBeVisible()
    await expect(page.getByText('E2E toys intro text')).toBeVisible()
  })

  test('toys-page global: catalogue card heading and body', async ({ page }) => {
    await expect(page.getByText('E2E Catalogue Card Heading')).toBeVisible()
    await expect(page.getByText('E2E catalogue card body')).toBeVisible()
  })

  test('toys-page global: feature card', async ({ page }) => {
    // exact: true — getByText matches case-insensitive substrings, so 'E2E Toys Feature'
    // would also resolve to the 'E2E toys feature body' paragraph
    await expect(page.getByText('E2E Toys Feature', { exact: true })).toBeVisible()
    await expect(page.getByText('E2E toys feature body')).toBeVisible()
  })

  test('catalogue URL wired to the CTA button', async ({ page }) => {
    const catalogueLink = page.getByRole('link', { name: 'E2E Open Catalogue' })
    await expect(catalogueLink).toBeVisible()
    await expect(catalogueLink).toHaveAttribute('href', 'https://setls.e2e.example/catalogue')
  })
})

// ── /join ──────────────────────────────────────────────────────────────────────

test.describe('/join CMS wiring', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/join')
  })

  test('membership-page global: section label and heading', async ({ page }) => {
    await expect(page.getByText('E2E Join Label')).toBeVisible()
    await expect(page.getByText('E2E Membership Page Heading')).toBeVisible()
  })

  test('membership-page global: richText intro', async ({ page }) => {
    await expect(page.getByText('E2E membership page intro')).toBeVisible()
  })

  test('membership-page global: note and terms & conditions', async ({ page }) => {
    await expect(page.getByText('E2E membership note')).toBeVisible()
    await expect(page.getByText('E2E terms and conditions body')).toBeVisible()
  })
})
