import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=login+test+demo&oq=login+test+demo&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDIxNDJqMGo5qAIAsAIA&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Test Login Practice Test Automation https://practicetestautomation.com › ...' }).click();
  await page.getByRole('link', { name: 'Courses' }).click();
  await page.locator('#loop-container div').filter({ hasText: 'Courses Selenium WebDriver and Java Monthly Subscription Bundle From beginner to' }).click();
  
  await page.getByRole('button', { name: 'Close' }).click();
  // ---------------------
  await context.close();
  await browser.close();
});