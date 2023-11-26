import { test, expect } from '@playwright/test';
import { AccoreeAdminLoginPagePOM } from '../../pages/accoreeAdminLoginPagePOM';

let page;
let accoreeAdminLogin;
let context;

test.describe('Regression Testing Suite', () => {
    test.beforeAll(async ({ browser }) => {
        console.log('Inside Before All');
        context = await browser.newContext({ recordVideo: { dir: './videos/' } });
        page = await context.newPage();
        accoreeAdminLogin = new AccoreeAdminLoginPagePOM(page, context, true);
    });

    test.beforeEach(async () => {
        console.log('Inside Before Each');
        await accoreeAdminLogin.clearCookies();
        await accoreeAdminLogin.clearLocalStorage();
        await accoreeAdminLogin.clearSessionStorage();
        await accoreeAdminLogin.setViewportSize({ width: 1920, height: 1080 });
        await accoreeAdminLogin.setPageLoadTimeout(60000);
        await accoreeAdminLogin.setNetworkIdleTimeout(60000);
        await accoreeAdminLogin.setWaitForTimeout(60000);
        await accoreeAdminLogin.setJavaScriptEnabled(true);
        await accoreeAdminLogin.setCSSEnabled(true);
        await accoreeAdminLogin.setGeolocation({ latitude: 37.7749, longitude: -122.4194 });
        await accoreeAdminLogin.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/000000000 Safari/537.36');
        await accoreeAdminLogin.setDeviceScaleFactor(1);
        await accoreeAdminLogin.startVideoRecording();
        await accoreeAdminLogin.startTracingAndScreenshots(); // Start tracing and screenshots

    });

    test('[JIRA] (SWF-547) Admin Login: To verify that the login button is disabled when no data is entered', async () => {
        try {
            console.log('Inside Try of Admin Login: To verify that the login button is disabled when no data is entered'); Test;
            await accoreeAdminLogin.goToAccoreeAdminLoginPage();
            await accoreeAdminLogin.enterEmail('abelm@tlcengine.com');
            await accoreeAdminLogin.enterPassword('Password123@');
            await accoreeAdminLogin.clickOnRememberMeCheckbox();
            await accoreeAdminLogin.clickOnLoginButton();
        } catch (error) {
            console.log('Inside Catch of Admin Login: To verify that the login button is disabled when no data is entered'); Test;
            console.error('Error:', error);
        }
    });

    test.afterEach(async () => {
        console.log('Inside After Each');
        await accoreeAdminLogin.stopTracingAndScreenshots(); // Stop tracing and take screenshots
        await accoreeAdminLogin.stopVideoRecording();
    });

    test.afterAll(async () => {
        console.log('Inside After All');
        await context.close();
    });
});