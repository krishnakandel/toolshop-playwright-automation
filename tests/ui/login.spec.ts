import { test, expect } from '@playwright/test';
test.describe('Login page tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  test('login page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('password field is visible', async ({ page }) => {
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

});