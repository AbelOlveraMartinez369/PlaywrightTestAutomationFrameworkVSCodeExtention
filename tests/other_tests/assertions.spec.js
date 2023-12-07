import test,{page, expect} from '@playwright/test'

test('Assertions Demo', async({page}) =>{

    await page.goto('https://kitchen.applitools.com/')
    await page.pause()
    
    //Validate page URL and Title
    await expect(page).toHaveURL('https://kitchen.applitools.com/')
    await expect(page).toHaveTitle(/.*Kitchen/)

    //Visual validation with screenshot
    await expect(page).toHaveScreenshot()

    
    /*
    //ASSERTIONS
    //Validate if element is present or not present
    await expect(await page.locator('text=The Kitchen')).toHaveCount(1)

    if (await page.$('text=The Kitchen')){
        await page.locator('text=The Kitchen').click()
    }

    //Validate if element is Visible or Hidden
    await expect(await page.locator('text=The Kitchen')).toBeVisible()
    await expect.soft(await page.locator('text=The Kitchen')).toBeHidden()

    //Validate if element is Enabled or not Enabled
    await expect(await page.locator('text=The Kitchen')).toBeEnabled()
    await expect.soft(await page.locator('text=The Kitchen')).toBeDisabled()
    await page.pause()
    
    //Validate if text matches value or not
    await expect(await page.locator('text=The Kitchen')).toHaveText('The Kitchen')
    await expect(await page.locator('text=The Kitchen')).not.toHaveText('123456789')
    await page.pause()
    
    //Validate Element Atribute
    await expect(await page.locator('text=The Kitchen')).toHaveAttribute('class',/.*css-dpmy2a/)
    await expect(await page.locator('text=The Kitchen')).toHaveClass(/.*css-dpmy2a/)
    */
    await page.pause()

})