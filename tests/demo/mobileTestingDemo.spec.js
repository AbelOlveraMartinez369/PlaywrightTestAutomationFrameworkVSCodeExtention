/*
  Playwright | Mobile Web Automation | Android Real & Emulated Device 
  | iPhone Emulated Device | 
*/
import { _android as android, devices, webkit } from 'playwright';
import { test } from "@playwright/test";

// Crear una lista para guardar los datos
let deviceDataList = [];

test("Run on Real Android, Emulated Android, and Emulated iPhone", async () => {
    // 1. Connect to the real Android device.
    const [realAndroidDevice] = await android.devices();
    console.log(`Real Android Device - Model: ${realAndroidDevice.model()}, Serial: ${realAndroidDevice.serial()}`);
    await realAndroidDevice.screenshot({ path: 'real_android_device.png' });

    // Launch Chrome browser on real Android.
    await realAndroidDevice.shell('am force-stop com.android.chrome');
    const realAndroidContext = await realAndroidDevice.launchBrowser();
    const realAndroidPage = await realAndroidContext.newPage();

    // Run test on real Android.
    await performLogin(realAndroidPage);

    // Imprimir los datos del dispositivo y del navegador después de cada prueba
    console.log({device: 'Real Android Device', model: realAndroidDevice.model(), serial: realAndroidDevice.serial(), browser: 'Chrome'});

    // Close real Android context and device.
    await realAndroidContext.close();
    await realAndroidDevice.close();

    // 2. Emulate an Android device in a browser.
    const browser = await webkit.launch();
    const emulatedAndroidContext = await browser.newContext(devices['Pixel 2']);
    const emulatedAndroidPage = await emulatedAndroidContext.newPage();

    // Run test on emulated Android.
    await performLogin(emulatedAndroidPage);

    // Imprimir los datos del dispositivo y del navegador después de cada prueba
    console.log({device: 'Pixel 2', browser: 'webkit'});

    // Close emulated Android context.
    await emulatedAndroidContext.close();

    // 3. Emulate an iPhone device in a browser.
    const iPhoneContext = await browser.newContext(devices['iPhone 11 Pro']);
    const iPhonePage = await iPhoneContext.newPage();

    // Run test on iPhone.
    await performLogin(iPhonePage);

    // Imprimir los datos del dispositivo y del navegador después de cada prueba
    console.log({device: 'iPhone 11 Pro', browser: 'webkit'});

    // Close iPhone context.
    await iPhoneContext.close();
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
