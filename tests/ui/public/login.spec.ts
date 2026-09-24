import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test.describe('Login Test Suite', () => {
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

  test('should mask password', async () => {
    await expect(loginPage.passwordInput).toHaveAttribute(
      'type',
      'password'
    );
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    if (!email || !password) {
      throw new Error(
        'TEST_USER_EMAIL and TEST_USER_PASSWORD must be defined in .env'
      );
    }

    await loginPage.login(email, password);

    await expect(page).toHaveURL(/\/account/);
  });

  test('should reject incorrect password', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL;

    if (!email) {
      throw new Error('TEST_USER_EMAIL must be defined in .env');
    }

    await loginPage.login(
      email,
      'InvalidPassword123!'
    );

    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('should reject unregistered email', async ({ page }) => {
    await loginPage.login(
      'notregistered@example.com',
      'Password123!'
    );

    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('should reject invalid email format', async ({ page }) => {
    await loginPage.login(
      'invalid-email',
      'Password123!'
    );

    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('should not submit with empty credentials', async ({ page }) => {
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('should not submit when password is empty', async ({ page }) => {
    await loginPage.enterEmail('test@example.com');

    await loginPage.clickLogin();

    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('should not submit when email is empty', async ({ page }) => {
    await loginPage.enterPassword('Password123!');

    await loginPage.clickLogin();

    await expect(page).toHaveURL(/\/auth\/login/);
  });
});