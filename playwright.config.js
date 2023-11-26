
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/demo',
  timeout: 86400000,
  expect: {
    timeout: 86400000,
  },
  retries: 1,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputPath: './test-results', outputDir: './playwright-report' }],
  ],
  use: {
    video: 'true',
    launchOptions: {
      slowMo: 0,
    },
    trace: 'on',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],
});