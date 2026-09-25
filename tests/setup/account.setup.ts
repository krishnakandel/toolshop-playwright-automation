import { test as setup, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { generateTestUser, saveTestUser } from '../../utils/testUser';

setup('create fresh test account through UI', async ({ page }) => {
  const user = generateTestUser();

  const registrationPage = new RegistrationPage(page);

  await registrationPage.goto();
  await registrationPage.register(user);

  // Successful registration redirects to login.
  await expect(page).toHaveURL(/\/auth\/login/, { timeout: 15000 });

  /*
   * Save only AFTER successful registration.
   * This prevents later tests from using credentials
   * for an account that failed to register.
   */
  saveTestUser(user);

  console.log(`Fresh test user created: ${user.email}`);
});