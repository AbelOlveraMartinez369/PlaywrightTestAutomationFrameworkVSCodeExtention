import { _android as android, devices, webkit } from 'playwright';
import { test } from "@playwright/test";
import { Builder, By } from 'selenium-webdriver';

const bsUsername = 'TU_NOMBRE_DE_USUARIO_BROWSERSTACK';
const bsAccessKey = 'TU_CLAVE_DE_ACCESO_BROWSERSTACK';

test("Run on Real Android, Emulated Android, and Emulated iPhone with BrowserStack", async () => {
    // Configuración para BrowserStack
    const capabilities = {
        'bstack:options': {
            userName: bsUsername,
            accessKey: bsAccessKey,
        },
        browserName: 'chrome',
        os: 'Windows',
        os_version: '10',
        name: 'My Test',
    };

    // 1. Real Android
    const [realAndroidDevice] = await android.devices();
    console.log(`Real Android Device - Model: ${realAndroidDevice.model()}, Serial: ${realAndroidDevice.serial()}`);
    await realAndroidDevice.screenshot({ path: 'real_android_device.png' });

    // Launch Chrome browser on real Android.
    await realAndroidDevice.shell('am force-stop com.android.chrome');
    const realAndroidContext = await realAndroidDevice.launchBrowser();
    const realAndroidPage = await realAndroidContext.newPage();

    // Run test on real Android.
    await performLogin(realAndroidPage);

    // Close real Android context and device.
    await realAndroidContext.close();
    await realAndroidDevice.close();

    // 2. Emulated Android with BrowserStack
    const browser = await webkit.launch();
    const emulatedAndroidContext = await browser.newContext(devices['Pixel 2']);
    const emulatedAndroidPage = await emulatedAndroidContext.newPage();

    // Run test on emulated Android.
    await performLogin(emulatedAndroidPage);

    // Close emulated Android context.
    await emulatedAndroidContext.close();

    // 3. Emulated iPhone with BrowserStack
    const driver = new Builder()
        .usingServer('http://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build();

    try {
        // Realiza la prueba de inicio de sesión con Selenium en BrowserStack
        await performLoginSelenium(driver);
    } finally {
        // Cierra el navegador después de la prueba
        await driver.quit();
    }
});

async function performLogin(page) {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('link', { name: 'Log out' }).click();
}

async function performLoginSelenium(driver) {
    await driver.get('https://practicetestautomation.com/practice-test-login/');
    await driver.findElement(By.name('Username')).click();
    await driver.findElement(By.name('Username')).sendKeys('student');
    await driver.findElement(By.name('Password')).click();
    await driver.findElement(By.name('Password')).sendKeys('Password123');
    await driver.findElement(By.name('Submit')).click();
    await driver.findElement(By.linkText('Log out')).click();
}
