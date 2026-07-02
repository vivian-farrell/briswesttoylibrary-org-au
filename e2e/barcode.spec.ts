import { test, expect } from '@playwright/test'
import { writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

test.describe('/barcode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/barcode')
  })

  test('page loads with heading and empty state', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Barcode Generator' })).toBeVisible()
    await expect(page.getByLabel(/Codes/)).toBeVisible()
    await expect(page.getByRole('button', { name: 'Print barcodes' })).toBeDisabled()
  })

  test('newline-separated codes render one barcode per line', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('T001\nT002\nT003\nABC123')
    await expect(page.locator('.barcode-cell')).toHaveCount(4)
    await expect(page.locator('.barcode-cell svg')).toHaveCount(4)
    await expect(page.getByText('4 barcodes ready')).toBeVisible()
  })

  test('each barcode cell has a solid black border', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('T001')
    const cell = page.locator('.barcode-cell').first()
    const borderStyle = await cell.evaluate(el => window.getComputedStyle(el).borderStyle)
    const borderColor = await cell.evaluate(el => window.getComputedStyle(el).borderColor)
    expect(borderStyle).toBe('solid')
    expect(borderColor).toBe('rgb(0, 0, 0)')
  })

  test('SVG barcode contains bar elements', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('T001')
    const rectCount = await page.locator('.barcode-cell svg rect').count()
    expect(rectCount).toBeGreaterThan(10)
  })

  test('print button enabled once codes are entered', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Print barcodes' })
    await expect(btn).toBeDisabled()
    await page.getByLabel(/Codes/).fill('T001')
    await expect(btn).toBeEnabled()
  })

  test('blank lines are filtered out', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('T001\n\n   \nT002')
    await expect(page.locator('.barcode-cell')).toHaveCount(2)
    await expect(page.getByText('2 barcodes ready')).toBeVisible()
  })

  test('codes are uppercased automatically', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('t001\nt002')
    await expect(page.locator('.barcode-cell')).toHaveCount(2)
    await expect(page.locator('.barcode-cell', { hasText: 'Invalid' })).toHaveCount(0)
  })

  test('invalid Code 39 character shows error placeholder instead of crashing', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('T001\nINVALID~CODE')
    await expect(page.locator('.barcode-cell')).toHaveCount(2)
    await expect(page.locator('.barcode-cell svg').first()).toBeVisible()
    await expect(page.locator('.barcode-cell', { hasText: 'Invalid' })).toBeVisible()
  })

  test('bar height slider updates the label', async ({ page }) => {
    await page.locator('#bar-height').fill('100')
    await expect(page.locator('label[for="bar-height"]')).toContainText('100 px')
  })

  test('bar width slider updates the label', async ({ page }) => {
    await page.locator('#bar-width').fill('3')
    await expect(page.locator('label[for="bar-width"]')).toContainText('3')
  })

  test('columns input changes the grid layout', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('T001\nT002\nT003\nT004\nT005\nT006')
    await page.getByLabel('Columns per row').fill('2')
    const gridCols = await page.locator('#barcode-grid').evaluate(
      el => window.getComputedStyle(el).gridTemplateColumns
    )
    expect(gridCols.split(' ').length).toBe(2)
  })

  test('clearing the textarea removes barcodes and disables print', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('T001\nT002')
    await expect(page.locator('.barcode-cell')).toHaveCount(2)
    await page.getByLabel(/Codes/).fill('')
    await expect(page.locator('.barcode-cell')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Print barcodes' })).toBeDisabled()
  })

  // ── CSV with toy titles ─────────────────────────────────────────────────────

  test('two-column CSV shows toy title below barcode', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('T001,Mega Bloks 80-piece')
    await expect(page.locator('.barcode-cell')).toHaveCount(1)
    await expect(page.locator('.barcode-cell').getByText('Mega Bloks 80-piece')).toBeVisible()
  })

  test('mix of codes-only and code+title lines renders correctly', async ({ page }) => {
    // Clear the default label so only title p elements are counted
    await page.getByLabel('Label').clear()
    await page.getByLabel(/Codes/).fill('T001\nT002,Fisher-Price Farm\nT003')
    await expect(page.locator('.barcode-cell')).toHaveCount(3)
    await expect(page.locator('.barcode-cell').getByText('Fisher-Price Farm')).toBeVisible()
    // Only 1 title paragraph — cells without a title show nothing extra
    const titlesVisible = await page.locator('.barcode-cell p').count()
    expect(titlesVisible).toBe(1)
  })

  test('title is not uppercased — preserves original casing', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('T001,Mega Bloks Set')
    await expect(page.locator('.barcode-cell').getByText('Mega Bloks Set')).toBeVisible()
  })

  test('title with commas must be quoted to include the commas', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('T001,"Red, Blue and Green blocks"')
    await expect(page.locator('.barcode-cell')).toHaveCount(1)
    await expect(page.locator('.barcode-cell').getByText('Red, Blue and Green blocks')).toBeVisible()
  })

  test('long title is truncated to a single line with a trailing ellipsis', async ({ page }) => {
    await page.getByLabel('Columns per row').fill('5')
    const longTitle = 'A Very Long Toy Name That Definitely Will Not Fit On One Single Line Of A Narrow Barcode Cutting Label No Matter How Wide The Window Is'
    await page.getByLabel(/Codes/).fill(`T001,${longTitle}`)
    const titleEl = page.locator('.barcode-cell p').last()
    const style = await titleEl.evaluate(el => {
      const s = window.getComputedStyle(el)
      return { whiteSpace: s.whiteSpace, overflow: s.overflow, textOverflow: s.textOverflow }
    })
    expect(style.whiteSpace).toBe('nowrap')
    expect(style.overflow).toBe('hidden')
    expect(style.textOverflow).toBe('ellipsis')
    // Content overflows its box, confirming the ellipsis is actually visually truncating it
    const overflowing = await titleEl.evaluate(el => el.scrollWidth > el.clientWidth)
    expect(overflowing).toBe(true)
  })

  // ── Label field ─────────────────────────────────────────────────────────────

  test('label defaults to Brisbane West Toy Library and appears on each barcode', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('T001\nT002')
    await expect(page.locator('.barcode-cell')).toHaveCount(2)
    await expect(page.locator('.barcode-cell').first().getByText('Brisbane West Toy Library')).toBeVisible()
    await expect(page.locator('.barcode-cell').nth(1).getByText('Brisbane West Toy Library')).toBeVisible()
  })

  test('label can be changed via the Label input', async ({ page }) => {
    await page.getByLabel('Label').fill('My Toy Library')
    await page.getByLabel(/Codes/).fill('T001')
    await expect(page.locator('.barcode-cell').getByText('My Toy Library')).toBeVisible()
  })

  test('clearing the label hides it from all cells', async ({ page }) => {
    await page.getByLabel('Label').clear()
    await page.getByLabel(/Codes/).fill('T001')
    const labelText = await page.locator('.barcode-cell').getByText('Brisbane West Toy Library').count()
    expect(labelText).toBe(0)
  })

  test('label appears above the barcode, title appears below it', async ({ page }) => {
    await page.getByLabel('Label').fill('TEST LIBRARY')
    await page.getByLabel(/Codes/).fill('T001,My Toy')
    const cell = page.locator('.barcode-cell').first()
    const paragraphs = cell.locator('p')
    await expect(paragraphs).toHaveCount(2)
    await expect(paragraphs.first()).toHaveText('TEST LIBRARY')
    await expect(paragraphs.nth(1)).toHaveText('My Toy')
  })

  // ── Quote stripping ─────────────────────────────────────────────────────────

  test('double quotes are stripped from codes and titles', async ({ page }) => {
    await page.getByLabel(/Codes/).fill('"T001","Mega Bloks 80-piece"')
    await expect(page.locator('.barcode-cell')).toHaveCount(1)
    await expect(page.locator('.barcode-cell', { hasText: 'Invalid' })).toHaveCount(0)
    await expect(page.locator('.barcode-cell').getByText('Mega Bloks 80-piece')).toBeVisible()
  })

  test('single quotes are stripped from codes and titles', async ({ page }) => {
    await page.getByLabel(/Codes/).fill("'T001','Fisher-Price Farm'")
    await expect(page.locator('.barcode-cell')).toHaveCount(1)
    await expect(page.locator('.barcode-cell', { hasText: 'Invalid' })).toHaveCount(0)
    await expect(page.locator('.barcode-cell').getByText('Fisher-Price Farm')).toBeVisible()
  })

  test('uploading a quoted CSV strips quotes and renders correctly', async ({ page }) => {
    const csvPath = join(tmpdir(), 'barcode-test-quoted.csv')
    writeFileSync(csvPath, '"T001","Mega Bloks 80-piece"\n"T002","Fisher-Price Farm"\n')

    await page.locator('input[aria-label="Upload CSV file"]').setInputFiles(csvPath)
    await expect(page.locator('.barcode-cell')).toHaveCount(2)
    await expect(page.locator('.barcode-cell', { hasText: 'Invalid' })).toHaveCount(0)
    await expect(page.locator('.barcode-cell').getByText('Mega Bloks 80-piece')).toBeVisible()
    await expect(page.locator('.barcode-cell').getByText('Fisher-Price Farm')).toBeVisible()
  })

  test('multi-column SETLS export uses only code and title columns, ignores the rest', async ({ page }) => {
    const csvPath = join(tmpdir(), 'barcode-test-setls.csv')
    writeFileSync(
      csvPath,
      '"A10","Zoomee Ride-On Trike (Giraffe)","In library","2026-05-19","A: Active","0-3","","Edit"\n' +
      '"A11","Fisher-Price Farm","In library","2026-05-19","A: Active","0-3","","Edit"\n',
    )

    await page.locator('input[aria-label="Upload CSV file"]').setInputFiles(csvPath)
    await expect(page.locator('.barcode-cell')).toHaveCount(2)
    await expect(page.locator('.barcode-cell', { hasText: 'Invalid' })).toHaveCount(0)
    await expect(page.locator('.barcode-cell').getByText('Zoomee Ride-On Trike (Giraffe)')).toBeVisible()
    await expect(page.locator('.barcode-cell').getByText('Fisher-Price Farm')).toBeVisible()
  })

  // ── CSV file upload ─────────────────────────────────────────────────────────

  test('uploading a codes-only CSV populates the textarea and renders barcodes', async ({ page }) => {
    const csvPath = join(tmpdir(), 'barcode-test-codes.csv')
    writeFileSync(csvPath, 'T001\nT002\nT003\n')

    await page.locator('input[aria-label="Upload CSV file"]').setInputFiles(csvPath)
    await expect(page.locator('.barcode-cell')).toHaveCount(3)
    await expect(page.getByText('3 barcodes ready')).toBeVisible()
  })

  test('uploading a two-column CSV renders barcodes with toy titles', async ({ page }) => {
    const csvPath = join(tmpdir(), 'barcode-test-titled.csv')
    writeFileSync(csvPath, 'T001,Mega Bloks 80-piece\nT002,Fisher-Price Farm\n')

    await page.locator('input[aria-label="Upload CSV file"]').setInputFiles(csvPath)
    await expect(page.locator('.barcode-cell')).toHaveCount(2)
    await expect(page.locator('.barcode-cell').getByText('Mega Bloks 80-piece')).toBeVisible()
    await expect(page.locator('.barcode-cell').getByText('Fisher-Price Farm')).toBeVisible()
  })
})
