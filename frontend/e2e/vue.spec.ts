import { test, expect } from '@playwright/test'

test.describe('VueApplication', () => {
  test('/ load', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Create Book')).toBeVisible()
    await expect(page.locator('text=Search Book')).toBeVisible()
  })

  test('/book/add load', async ({ page }) => {
    await page.goto('/book/add')
    await expect(page.locator('form')).toBeVisible()
    await expect(page.locator('text=Create Book')).toBeVisible()
  })

  test('/book/123 load', async ({ page }) => {
    await page.goto('/book/123')
    await expect(page.locator('div, p')).toHaveText(/By|SBN/i)
  })

  test('/book/edit/123 load', async ({ page }) => {
    await page.goto('/book/edit/123')
    await expect(page.locator('form')).toBeVisible()
    await expect(page.locator('text=Edit book')).toBeVisible()
  })
})
