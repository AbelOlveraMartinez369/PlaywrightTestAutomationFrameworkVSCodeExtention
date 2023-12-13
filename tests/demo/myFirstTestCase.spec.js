const { test, expect } = require('@playwright/test');
const myModule = require('../../tests-examples/myFirstDemo.spec.js');


test('My First test', async ({ page }) => {
    await page.goto('https://www.google.com.mx');
    await expect(page).toHaveTitle('Google');
    await expect(page).toHaveURL
    await expect(page).toHaveScreenshot
});

test('Prueba de función hello', async () => {
  const result = myModule.hello();
  expect(result).toBe('hello');
});

test('Prueba de función bye', async () => {
  const result = myModule.bye();
  expect(result).toBe('bye');
});
