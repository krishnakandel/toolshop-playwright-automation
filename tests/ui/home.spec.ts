// import { test, expect } from '@playwright/test';

// test('Toolshop homepage loads successfully', async ({ page }) => {

//   await page.goto('/');

//   await expect(page).toHaveTitle(/Practice Software Testing/);

// });

import { test, expect } from '@playwright/test';

test.describe('Toolshop basic UI tests', () => {

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

    // Depending on the current UI, Enter may trigger the search.
    await searchBox.press('Enter');

    await expect(page.getByText(/pliers/i).first()).toBeVisible();
  });

  test('login page can be opened', async ({ page }) => {
    await page.goto('/auth/login');

    await expect(page).toHaveURL(/auth\/login/);
  });

});