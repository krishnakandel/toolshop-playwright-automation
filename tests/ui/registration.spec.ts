import { test, expect } from '@playwright/test';
test.describe('Registration page tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/register');
  });

  test('registration button is visible', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Register' })
    ).toBeVisible();
  });

});