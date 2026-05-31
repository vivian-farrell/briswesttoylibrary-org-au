import { test, expect } from '@playwright/test'

// ── Navigation ─────────────────────────────────────────────────────────────────

test.describe('navigation CMS wiring', () => {
  test('nav items appear in menu overlay with correct hrefs', async ({ page }) => {
    await page.goto('/')

    // Open the menu — hamburger has aria-label="Open menu"
    await page.getByRole('button', { name: 'Open menu' }).click()

    // Wait for the overlay to be visible
    const overlay = page.getByRole('dialog', { name: 'Navigation menu' })
    await expect(overlay).toBeVisible()

    // Regular nav item
    const navOne = overlay.getByRole('link', { name: 'E2E Nav One' })
    await expect(navOne).toBeVisible()
    await expect(navOne).toHaveAttribute('href', '/#location')

    // CTA item (styled differently but still a link with the label)
    const navCTA = overlay.getByRole('link', { name: 'E2E Nav CTA' })
    await expect(navCTA).toBeVisible()
    await expect(navCTA).toHaveAttribute('href', '/join')
  })
})

// ── Footer ─────────────────────────────────────────────────────────────────────

test.describe('footer CMS wiring', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('footer: about text', async ({ page }) => {
    await expect(page.getByText('E2E footer about text')).toBeVisible()
  })

  test('footer: column headings', async ({ page }) => {
    // exact: true avoids matching 'E2E Explore Link' as a substring of 'E2E Explore'
    await expect(page.getByText('E2E Explore', { exact: true })).toBeVisible()
    await expect(page.getByText('E2E Get Involved', { exact: true })).toBeVisible()
  })

  test('footer: explore link label and href', async ({ page }) => {
    const link = page.getByRole('link', { name: 'E2E Explore Link' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/e2e-explore')
  })

  test('footer: involved link label and href', async ({ page }) => {
    const link = page.getByRole('link', { name: 'E2E Involved Link' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/e2e-involved')
  })

  test('footer: acknowledgement text', async ({ page }) => {
    await expect(page.getByText('E2E acknowledgement text')).toBeVisible()
  })

  test('footer: copyright text', async ({ page }) => {
    // Copyright text also appears in the nav overlay; scope to the page footer element
    await expect(page.getByRole('contentinfo').getByText(/E2E Library Inc/)).toBeVisible()
  })
})
