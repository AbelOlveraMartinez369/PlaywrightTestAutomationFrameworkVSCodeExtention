import {test, expect} from '@playwright/test'

test('Demo Login Test 1', async({page}) =>{
await page.goto('https://demo.applitools.com/')
await page.locator('input[placeholder="Enter your username"]').fill('Abel Olvera Martinez')
await page.locator('input[placeholder="Enter your password"]').fill('Arquitecto QA SDET')

await page.waitForSelector('text=Sign in',{timeout:4000})
await expect(page.locator('text=Sign in')).toHaveCount(1)

await page.locator('#log-in').click()

await page.waitForSelector('text=ACME',{timeout:4000})
await expect(page.locator('text=ACME')).toHaveCount(1)

await page.locator('text=ACME').isVisible()

})

test('Demo Login Test 2', async ({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.pause()
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('span').filter({ hasText: 'vamsi vara' }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
})


test.only('Demo Login Test 3', async ({page})=>{
    //await page.pause()
    await page.goto('https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F');
    await page.getByLabel('Email:').click();
    await page.getByLabel('Email:').press('Control+a');
    await page.getByLabel('Email:').fill('admin@yourstore.com');
    await page.getByLabel('Password:').click();
    await page.getByLabel('Password:').press('Control+a');
    await page.getByLabel('Password:').fill('admin');
    await page.getByLabel('Remember me?').check();
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    //await page.pause()
    //await page.close()


})