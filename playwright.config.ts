import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'https://practicesoftwaretesting.com',

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  projects: [
    // Authentication setup
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.ts/,
    },

    // Tests that do NOT need login
    {
      name: 'chromium-public',

      testMatch: /.*\/public\/.*\.spec\.ts/,

      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Tests that require authentication
    {
      name: 'chromium-authenticated',

      testMatch: /.*\/authenticated\/.*\.spec\.ts/,

      use: {
        ...devices['Desktop Chrome'],

        storageState: '.auth/user.json',
      },

      dependencies: ['setup'],
    },
  ],
});