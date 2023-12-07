import { expect } from '@playwright/test';

export class AccoreeAdminLoginPagePOM {
    constructor(page, context, videoRecording = false) {
        if (!context) {
            throw new Error('El contexto no puede ser nulo.');
        }
        this.page = page;
        this.context = context;
        this.screenshotCount = 0;
        this.traceCount = 0;
        this.videoRecording = videoRecording;

        // Locators
        this.main = page.locator('main');
        this.accoreLogoForm = page.locator('.w-full').first();
        this.accoreeLogo = page.locator('img[alt="logo"]');
        this.accoreeLoginForm = page.locator('div:has-text("loginEmailPlease enter your emailPasswordRemember meLogin")').nth(1);
        this.loginLabel = page.locator('div:has-text("loginEmailPlease enter your emailPasswordRemember meLogin")');
        this.emailLabel = page.locator('div:has-text("Email")');
        this.emailLabelInsideTextBox = page.locator('input[placeholder="Enter your email"]');
        this.emailTextbox = this.emailLabelInsideTextBox;
        this.emailLabelBelowTextBox = page.locator('div:has-text("Invalid Email")');
        this.passwordLabel = page.locator('div:has-text("Password")');
        this.passwordLabelInsideTextBox = page.locator('input[placeholder="Enter your password"]');
        this.passwordTextbox = this.passwordLabelInsideTextBox;
        this.passwordLabelBelowTextBox = page.locator('div:has-text("Please enter your password")');
        this.rememberMeCheckboxLabel = page.locator('div:has-text("Remember me")');
        this.rememberMeCheckbox = page.locator('span').nth(0);
        this.loginButton = page.locator('div').filter({ hasText: /^Login$/ });

        // Bind methods to the class instance
        this.startTracingAndScreenshots = this.startTracingAndScreenshots.bind(this);
    }

    async startTracingAndScreenshots(videoRecording = false) {
        if (typeof videoRecording !== 'boolean') {
            throw new Error('El parámetro "videoRecording" debe ser un booleano.');
        }
        const options = { screenshots: true, snapshots: true, videos: videoRecording };
        if (!this.context.tracing._isTracing) {
            await this.context.tracing.start(options);
        }
    }

    async startVideoRecording() {
        if (!this.context.tracing._isTracing) {
            await this.context?.tracing?.start({ videos: true });
        }
    }

    async stopVideoRecording() {
        await this.context?.tracing?.stop();
    }

    async stopTracingAndScreenshots() {
        if (this.context.tracing._isTracing) {
            await this.context.tracing.stop();
        }
    }

    async takeSnapshotAndScreenshot() {
        try {
            await this.startTracingAndScreenshots();
            const screenshotFileName = `./test-results/screenshot${this.screenshotCount++}_${Date.now()}.png`;
            const zipFileName = `./test-results/trace${this.traceCount++}_${Date.now()}.zip`;
            console.log('Trace path:', zipFileName);

            await this.page.screenshot({ path: screenshotFileName });

            console.log(`Snapshot and screenshot taken successfully. Screenshot: ${screenshotFileName}, Trace: ${zipFileName}`);
        } catch (error) {
            console.error('Error in takeSnapshotAndScreenshot:', error);
        }
    };


    async goToAccoreeAdminLoginPage() {
        await this.page.goto('https://nsp-admin.tlcengine.com/login');
        const currentURL = await this.page.url();

        expect(currentURL).toBe('https://nsp-admin.tlcengine.com/login');

        const pageTitle = await this.page.title();
        console.log('The page title is:', pageTitle);

        expect(pageTitle).toBe('Accoree Admin | Login');
        await this.takeSnapshotAndScreenshot();
    }

    async validateAccoreeLogoIsVisible() {
        expect(await this.accoreeLogo.isVisible()).toBeTruthy();
        await this.takeSnapshotAndScreenshot();
    }

    async validateLoginLabelIsVisible() {
        expect(await this.loginLabel.isVisible()).toBeTruthy();
        expect(await this.loginLabel).toHaveText('Login');
        await this.takeSnapshotAndScreenshot();
    }

    async validateEmailLabelIsVisible() {
        expect(await this.emailLabel.isVisible()).toBeTruthy();
        expect(await this.emailLabel).toHaveText('Email');
        await this.takeSnapshotAndScreenshot();
    }

    async validateEmailLabelInsideTextBoxIsVisible() {
        expect(await this.emailLabelInsideTextBox.isVisible()).toBeTruthy();
        expect(await this.emailLabelInsideTextBox).toHaveText('Enter your email');
        expect(await this.emailTextbox.innerText()).toBe('Enter your email');
        await this.takeSnapshotAndScreenshot();
    }

    async enterEmail(email) {
        if (!email) {
            throw new Error('El correo electrónico no puede ser nulo.');
        }
        expect(await this.emailTextbox.isVisible()).toBe(true);
        expect(await this.emailTextbox.isEditable()).toBe(true);
        expect(await this.emailTextbox.inputValue()).toBe('');
        await this.emailTextbox.click();
        await this.emailTextbox.fill(email);
        expect(await this.emailTextbox.inputValue()).toBe(email);
        expect(await this.emailTextbox.innerText()).toBe('');
        await this.takeSnapshotAndScreenshot();
    }

    async validateEmailLabelBelowTextBoxIsVisible() {
        expect(await this.emailLabelBelowTextBox.isVisible()).toBeTruthy();
        expect(await this.emailLabelBelowTextBox).toContainText('Please enter your email');
        await this.takeSnapshotAndScreenshot();
    }

    async validatePasswordLabelIsVisible() {
        expect(await this.passwordLabel.isVisible()).toBeTruthy();
        expect(await this.passwordLabel).toContainText('Password');
        await this.takeSnapshotAndScreenshot();
    }

    async validatePasswordLabelInsideTextBoxIsVisible() {
        expect(await this.passwordLabelInsideTextBox.isVisible()).toBeTruthy();
        expect(await this.passwordLabelInsideTextBox).toContainText('Password');
        await this.takeSnapshotAndScreenshot();
    }

    async enterPassword(password) {
        if (!password) {
            throw new Error('La contraseña no puede ser nula.');
        }
        expect(await this.passwordTextbox.isVisible()).toBeTruthy();
        expect(await this.passwordTextbox.isEditable()).toBe(true);
        expect(await this.passwordTextbox).toHaveValue('');
        expect(await this.passwordTextbox.inputValue()).toBe('');
        await this.passwordTextbox.fill(password);
        expect(await this.passwordTextbox).toHaveText('');
        expect(await this.passwordTextbox).toHaveValue(password);
        expect(await this.passwordTextbox.innerText()).toBe('');
        await this.takeSnapshotAndScreenshot();
    }

    async validatePasswordLabelBelowTextBoxIsVisible() {
        expect(await this.passwordLabelBelowTextBox.isVisible()).toBeTruthy();
        expect(await this.passwordLabelBelowTextBox).toContainText('Please enter your password');
        await this.takeSnapshotAndScreenshot();
    }

    async validateRememberMeCheckboxLabel() {
        expect(await this.rememberMeCheckboxLabel.isVisible()).toBeTruthy();
        expect(await this.rememberMeCheckboxLabel).toHaveText('Remember Me');
        await this.takeSnapshotAndScreenshot();
    }

    async clickOnRememberMeCheckbox() {
        if (!await this.rememberMeCheckbox.isVisible()) {
            throw new Error('El checkbox "Recordarme" no es visible.');
        }
        expect(await this.rememberMeCheckbox.isVisible()).toBeTruthy();
        await this.rememberMeCheckbox.check();
        expect(await this.rememberMeCheckbox).toBeEnabled();
        expect(await this.rememberMeCheckbox).not.toBeChecked();
        await this.rememberMeCheckbox.click();
        expect(await this.rememberMeCheckbox).not.toBeChecked();
        await this.takeSnapshotAndScreenshot();
    }

    async validateLoginButtonText() {
        if (!await this.loginButton.isVisible()) {
            throw new Error('El botón "Iniciar sesión" no es visible.');
        }
        expect(await this.loginButton.isVisible()).toBeTruthy();
        expect(await this.loginButton).toBeDisabled();
        expect(await this.loginButton).toBeEnabled();
        expect(await this.loginButton).toHaveText('Login');
        expect(await this.loginButton.text()).toBe('Login');
        await this.takeSnapshotAndScreenshot();
    }

    async clickOnLoginButton() {
        expect(await this.loginButton.isVisible()).toBeTruthy();
        expect(await this.loginButton).toBeEnabled();
        await this.loginButton.click();
        await this.takeSnapshotAndScreenshot();
    }
}
