import { devices, webkit, firefox, chromium } from 'playwright';
import { test } from "@playwright/test";

const allDevices = Object.values(devices);
const allBrowsers = { 'webkit': webkit, 'firefox': firefox, 'chromium': chromium };

// Crear una lista para guardar los datos
let deviceDataList = [];

test("Run on Real Android, Emulated Android, and Emulated iPhone on all supported browsers", async ({ browserName }) => {
    for (const device of allDevices) {
        const context = await startBrowserContext(device, allBrowsers[browserName]);
        const page = await context.newPage();

        // Run test on the device.
        await performLogin(page);

        // Imprimir los datos del dispositivo y del navegador después de cada prueba
        console.log(deviceDataList[deviceDataList.length - 1]);

        // Close context.
        await context.close();
    }

    // Imprimir los datos al final
    console.log(deviceDataList);
});

async function startBrowserContext(device, browser) {
    let deviceData = {};
    let context;

    if (device) {
        // Emulate a device
        deviceData.browser = browser.name();
        deviceData.device = device.name;
        context = await browser.launch();
    } else {
        // Real device
        const [realDevice] = await android.devices();
        console.log(`Real Device - Model: ${realDevice.model()}, Serial: ${realDevice.serial()}`);
        deviceData.browser = 'Chrome';
        deviceData.device = `Model: ${realDevice.model()}, Serial: ${realDevice.serial()}`;
        await realDevice.screenshot({ path: 'real_device.png' });

        // Launch Chrome browser on real device.
        await realDevice.shell('am force-stop com.android.chrome');
        context = await realDevice.launchBrowser();
    }

    // Guardar los datos en la lista
    deviceDataList.push(deviceData);
    return context;
}

async function performLogin(page) {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('link', { name: 'Log out' }).click();
}
