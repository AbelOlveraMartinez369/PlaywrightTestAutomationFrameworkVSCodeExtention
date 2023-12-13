import {test, expect,chromium} from '@playwright/test'

test('Slow motion and video recording demo', async()=>{
    //Launch browser
    const browser=await chromium.launch({
        headless:false,
        slowMo:500
    })

    //Create a new incognito browser context
    const context=await browser.newContext({
        recordVideo:{
            dir:'videos/',
            size:{width:800,height:600}
        }
    })

    //Create a new page inside context
    const page=await context.newPage()
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByPlaceholder('Username').click()
    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').click()
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()
    //await page.pause()
    await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[2]/ul/li/span/img').click()
    await page.getByRole('menuitem', { name: 'Logout' }).click()

    //Dispose context once it's no lo longer needed
    await context.close()
})