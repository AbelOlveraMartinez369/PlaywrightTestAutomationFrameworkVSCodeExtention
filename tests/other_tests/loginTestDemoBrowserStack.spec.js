const { Builder, By } = require('selenium-webdriver');

const bsUsername = 'TU_NOMBRE_DE_USUARIO_BROWSERSTACK';
const bsAccessKey = 'TU_CLAVE_DE_ACCESO_BROWSERSTACK';

test("Run on BrowserStack", async () => {
    // Configura las capacidades para BrowserStack
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

    // Crea un nuevo WebDriver con las capacidades configuradas
    const driver = new Builder()
        .usingServer('http://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build();

    try {
        // Realiza la prueba de inicio de sesión
        await performLoginSelenium(driver);
    } finally {
        // Cierra el navegador después de la prueba
        await driver.quit();
    }
});

// Función para realizar el inicio de sesión con Selenium
async function performLoginSelenium(driver) {
    await driver.get('https://practicetestautomation.com/practice-test-login/');
    await driver.findElement(By.name('Username')).click();
    await driver.findElement(By.name('Username')).sendKeys('student');
    await driver.findElement(By.name('Password')).click();
    await driver.findElement(By.name('Password')).sendKeys('Password123');
    await driver.findElement(By.name('Submit')).click();
    await driver.findElement(By.linkText('Log out')).click();
}
