import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


export default defineConfig({
  testDir: './tests',

  timeout: 60 * 1000,

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    baseURL: process.env.SWAG_BASE_URL,
    storageState: 'storageState.json',

    headless: true,

    actionTimeout: 5000,

    navigationTimeout: 10000,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
