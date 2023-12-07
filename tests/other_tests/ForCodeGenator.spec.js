// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://www.youtube.com/@qasdetsteammachine/videos');
  await page.pause()
});