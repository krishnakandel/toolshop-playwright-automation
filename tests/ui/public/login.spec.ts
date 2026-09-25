import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { readTestUser } from '../../../utils/testUser';

test.describe('Login Test Suite', () => {
  test.describe.configure({ mode: 'serial' });

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should display login form', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const user = readTestUser();

    await loginPage.login(user.email, user.password);
    await expect(page).toHaveURL(/\/account/);
  });

  test('should reject incorrect password', async () => {
    const user = readTestUser();

    await loginPage.login(user.email, 'WrongPassword!123A');
    await expect(loginPage.loginError).toBeVisible();
  });

  test('should reject unregistered email', async () => {
    const user = readTestUser();

    await loginPage.login(`unknown.${Date.now()}@example.com`, user.password);
    await expect(loginPage.loginError).toBeVisible();
  });

  test('should validate empty credentials', async () => {
    await loginPage.clickLogin();

    await expect(loginPage.emailError).toBeVisible();
    await expect(loginPage.passwordError).toBeVisible();
  });

  test('should validate invalid email format', async () => {
    await loginPage.login('invalid-email', 'Password!123A');
    await expect(loginPage.emailError).toBeVisible();
  });

  test('password should be masked', async () => {
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });
});