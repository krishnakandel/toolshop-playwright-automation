import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // 1. ACCOUNT SETUP
    // Creates one fresh user through the registration UI
    {
      name: 'account-setup',
      testMatch: '**/setup/account.setup.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    // 2. AUTHENTICATION SETUP
    // Logs in with the fresh account and creates .auth/user.json
    {
      name: 'auth-setup',
      testMatch: '**/setup/auth.setup.ts',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['account-setup'],
    },

    // 3. PUBLIC TESTS
    // No account and no storageState required
    {
      name: 'chromium-public',
      testMatch: [
        '**/ui/public/home.spec.ts',
        '**/ui/public/product.spec.ts',
        '**/ui/public/registration.spec.ts',
        '**/ui/public/search.spec.ts',
      ],
      use: { ...devices['Desktop Chrome'] },
    },

    // 4. LOGIN TESTS
    // Fresh account must exist first, but tests start logged out
    {
      name: 'chromium-login',
      testMatch: '**/ui/public/login.spec.ts',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['account-setup'],
    },

    // 5. AUTHENTICATED TESTS
    // Fresh account -> login -> storageState -> tests
    {
      name: 'chromium-authenticated',
      testMatch: '**/ui/authenticated/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      dependencies: ['auth-setup'],
    },
  ],
});