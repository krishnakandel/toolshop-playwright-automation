import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { readTestUser } from '../../utils/testUser';

const authFile = '.auth/user.json';

setup('authenticate test user', async ({ page }) => {
  const user = readTestUser();

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(user.email, user.password);

  await expect(page).toHaveURL(/\/account/, { timeout: 15000 });

  await page.context().storageState({ path: authFile });

  console.log(`Authentication state saved for: ${user.email}`);
});