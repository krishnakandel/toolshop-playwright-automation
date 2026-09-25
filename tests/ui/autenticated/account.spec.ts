import { test, expect } from '@playwright/test';

test.describe('Account Tests', () => {
  test('authenticated user should access account page', async ({ page }) => {
    await page.goto('/account');
    await expect(page).toHaveURL(/\/account/);
  });
});