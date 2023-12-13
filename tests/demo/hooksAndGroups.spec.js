 /*
Hooks:

beforeAll
beforeEach
afterAll
afterEach 


Groups

describe
*/

import { test, expect } from '@playwright/test'


test.describe('Regression Testing Suite',()=>{
test.beforeAll(async ({ browser }) => {
    global.context=await browser.newContext()
})

test.beforeEach(async () => {
    //Create a new page from global context
    global.page=await global.context.newPage()
    await global.page.goto('https://www.saucedemo.com')
    await global.page.locator('[data-test="username"]').click()
    await global.page.locator('[data-test="username"]').fill('standard_user')
    await global.page.locator('[data-test="password"]').click()
    await global.page.locator('[data-test="password"]').fill('secret_sauce')
    await global.page.locator('[data-test="login-button"]').click()
    await global.page.waitForURL('https://www.saucedemo.com/inventory.html')
})

test.afterEach(async () => {
    await global.page.close()
})

test.afterAll(async () => {
    await global.context.close()
})

test('buy and order', async () => {
    await global.page.locator('#item_4_img_link').click();
    await global.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
    await global.page.locator('#item_0_title_link').click();
    await global.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
    await global.page.locator('#item_1_img_link').click();
    await global.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await global.page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
    await global.page.locator('#item_5_title_link').click();
    await global.page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
    await global.page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
    await global.page.locator('a').filter({ hasText: '2' }).click();
    await global.page.locator('[data-test="continue-shopping"]').click();
    await global.page.locator('a').filter({ hasText: '2' }).click();
    await global.page.locator('[data-test="checkout"]').click();
    await global.page.locator('[data-test="firstName"]').click();
    await global.page.locator('[data-test="firstName"]').fill('Abel');
    await global.page.locator('[data-test="lastName"]').click();
    await global.page.locator('[data-test="lastName"]').fill('Olvera Martinez');
    await global.page.locator('[data-test="postalCode"]').click();
    await global.page.locator('[data-test="postalCode"]').fill('09100');
    await global.page.locator('[data-test="continue"]').click();
    await global.page.locator('[data-test="finish"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
})

test('logout', async () => {
    await global.page.getByRole('button', { name: 'Open Menu' }).click();
    await global.page.getByRole('link', { name: 'Logout' }).click()
    await global.page.waitForURL('https://www.saucedemo.com')
})
})


test.describe('Integration Testing Suite',()=>{
    test.beforeAll(async ({ browser }) => {
        global.context=await browser.newContext()
    })
    
    test.beforeEach(async () => {
        //Create a new page from global context
        global.page=await global.context.newPage()
        await global.page.goto('https://www.saucedemo.com')
        await global.page.locator('[data-test="username"]').click()
        await global.page.locator('[data-test="username"]').fill('standard_user')
        await global.page.locator('[data-test="password"]').click()
        await global.page.locator('[data-test="password"]').fill('secret_sauce')
        await global.page.locator('[data-test="login-button"]').click()
        await global.page.waitForURL('https://www.saucedemo.com/inventory.html')
    })
    
    test.afterEach(async () => {
        await global.page.close()
    })
    
    test.afterAll(async () => {
        await global.context.close()
    })
    
    test('buy and order', async () => {
        await global.page.locator('#item_4_img_link').click();
        await global.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await global.page.locator('[data-test="back-to-products"]').click();
        await global.page.locator('#item_0_title_link').click();
        await global.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await global.page.locator('[data-test="back-to-products"]').click();
        await global.page.locator('#item_1_img_link').click();
        await global.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await global.page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
        await global.page.locator('[data-test="back-to-products"]').click();
        await global.page.locator('#item_5_title_link').click();
        await global.page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        await global.page.locator('[data-test="back-to-products"]').click();
        await global.page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
        await global.page.locator('a').filter({ hasText: '2' }).click();
        await global.page.locator('[data-test="continue-shopping"]').click();
        await global.page.locator('a').filter({ hasText: '2' }).click();
        await global.page.locator('[data-test="checkout"]').click();
        await global.page.locator('[data-test="firstName"]').click();
        await global.page.locator('[data-test="firstName"]').fill('Abel');
        await global.page.locator('[data-test="lastName"]').click();
        await global.page.locator('[data-test="lastName"]').fill('Olvera Martinez');
        await global.page.locator('[data-test="postalCode"]').click();
        await global.page.locator('[data-test="postalCode"]').fill('09100');
        await global.page.locator('[data-test="continue"]').click();
        await global.page.locator('[data-test="finish"]').click();
        await global.page.locator('[data-test="back-to-products"]').click();
    })
    
    test('logout', async () => {
        await global.page.getByRole('button', { name: 'Open Menu' }).click();
        await global.page.getByRole('link', { name: 'Logout' }).click()
        await global.page.waitForURL('https://www.saucedemo.com')
    })
    })

    test.describe('Smoke Testing Suite',()=>{
        test.beforeAll(async ({ browser }) => {
            global.context=await browser.newContext()
        })
        
        test.beforeEach(async () => {
            //Create a new page from global context
            global.page=await global.context.newPage()
            await global.page.goto('https://www.saucedemo.com')
            await global.page.locator('[data-test="username"]').click()
            await global.page.locator('[data-test="username"]').fill('standard_user')
            await global.page.locator('[data-test="password"]').click()
            await global.page.locator('[data-test="password"]').fill('secret_sauce')
            await global.page.locator('[data-test="login-button"]').click()
            await global.page.waitForURL('https://www.saucedemo.com/inventory.html')
        })
        
        test.afterEach(async () => {
            await global.page.close()
        })
        
        test.afterAll(async () => {
            await global.context.close()
        })
        
        test('buy and order', async () => {
            await global.page.locator('#item_4_img_link').click();
            await global.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await global.page.locator('[data-test="back-to-products"]').click();
            await global.page.locator('#item_0_title_link').click();
            await global.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
            await global.page.locator('[data-test="back-to-products"]').click();
            await global.page.locator('#item_1_img_link').click();
            await global.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
            await global.page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
            await global.page.locator('[data-test="back-to-products"]').click();
            await global.page.locator('#item_5_title_link').click();
            await global.page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
            await global.page.locator('[data-test="back-to-products"]').click();
            await global.page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
            await global.page.locator('a').filter({ hasText: '2' }).click();
            await global.page.locator('[data-test="continue-shopping"]').click();
            await global.page.locator('a').filter({ hasText: '2' }).click();
            await global.page.locator('[data-test="checkout"]').click();
            await global.page.locator('[data-test="firstName"]').click();
            await global.page.locator('[data-test="firstName"]').fill('Abel');
            await global.page.locator('[data-test="lastName"]').click();
            await global.page.locator('[data-test="lastName"]').fill('Olvera Martinez');
            await global.page.locator('[data-test="postalCode"]').click();
            await global.page.locator('[data-test="postalCode"]').fill('09100');
            await global.page.locator('[data-test="continue"]').click();
            await global.page.locator('[data-test="finish"]').click();
            await global.page.locator('[data-test="back-to-products"]').click();
        })
        
        test('logout', async () => {
            await global.page.getByRole('button', { name: 'Open Menu' }).click();
            await global.page.getByRole('link', { name: 'Logout' }).click()
            await global.page.waitForURL('https://www.saucedemo.com')
        })
        })