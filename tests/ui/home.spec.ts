
import { test, expect } from '@playwright/test';
test.describe('Toolshop home page tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Practice Software Testing/);
  });

  test('URL should be Toolshop homepage', async ({ page }) => {
    await expect(page).toHaveURL(/practicesoftwaretesting/);
  });

  test('search field is visible', async ({ page }) => {
    const searchBox = page.getByPlaceholder(/search/i);
    await expect(searchBox).toBeVisible();
  });

  test('user can search for a product', async ({ page }) => {
    const searchBox = page.getByPlaceholder(/search/i);

    await searchBox.fill('pliers');
    await searchBox.press('Enter');

    await expect(page.getByText(/pliers/i).first()).toBeVisible();
  });

});