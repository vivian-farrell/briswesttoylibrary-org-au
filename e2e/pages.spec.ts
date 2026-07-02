import { test, expect } from '@playwright/test'

// ── /volunteer ─────────────────────────────────────────────────────────────────

test.describe('/volunteer CMS wiring', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/volunteer')
  })

  test('heading and intro', async ({ page }) => {
    await expect(page.getByText('E2E Volunteer Heading')).toBeVisible()
    await expect(page.getByText('E2E volunteer intro')).toBeVisible()
  })

  test('richText content body', async ({ page }) => {
    await expect(page.getByText('E2E volunteer body')).toBeVisible()
  })

  test('role title, description, commitment badge', async ({ page }) => {
    await expect(page.getByText('E2E Role Title')).toBeVisible()
    await expect(page.getByText('E2E role desc')).toBeVisible()
    await expect(page.getByText('E2E commitment')).toBeVisible()
  })

  test('CTA label and email href', async ({ page }) => {
    const cta = page.getByRole('link', { name: /E2E Express Interest/ })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', 'mailto:volunteer@e2e.example?subject=Volunteer%20Interest')
  })

  test('SETLS calendar link', async ({ page }) => {
    const link = page.getByRole('link', { name: 'View Volunteer Shift Calendar →' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', 'https://setls.e2e.example/calendar')
  })
})

// ── /faq ───────────────────────────────────────────────────────────────────────

test.describe('/faq CMS wiring', () => {
  test('FAQ question is visible and answer revealed on click', async ({ page }) => {
    await page.goto('/faq')

    const question = page.getByRole('button', { name: 'E2E FAQ Question?' })
    await expect(question).toBeVisible()

    // Answer is hidden inside a collapsed accordion — click to expand
    await question.click()
    await expect(page.getByText('E2E FAQ answer')).toBeVisible()
  })
})

// ── /news ──────────────────────────────────────────────────────────────────────

test.describe('/news CMS wiring', () => {
  test('seeded post title, category badge, and excerpt', async ({ page }) => {
    await page.goto('/news')

    await expect(page.getByText('E2E Test Post')).toBeVisible()

    // Category 'news' maps to label 'News'
    await expect(page.getByText('News').first()).toBeVisible()

    await expect(page.getByText('E2E test excerpt')).toBeVisible()
  })
})

// ── /toys ──────────────────────────────────────────────────────────────────────

test.describe('/toys CMS wiring', () => {
  test('catalogue URL wired to Open Toy Catalogue button', async ({ page }) => {
    await page.goto('/toys')

    const catalogueLink = page.getByRole('link', { name: 'Open Toy Catalogue →' })
    await expect(catalogueLink).toBeVisible()
    await expect(catalogueLink).toHaveAttribute('href', 'https://setls.e2e.example/catalogue')
  })
})
