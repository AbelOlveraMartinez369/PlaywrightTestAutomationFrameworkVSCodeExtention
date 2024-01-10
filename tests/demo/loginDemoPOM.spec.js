import { test, expect, chromium } from '@playwright/test';
import { loginPage } from '../../pages/loginPOM';
require('dotenv').config();
const fs = require('fs');

// Leer el archivo properties.env y convertirlo en un objeto JSON
let rawdata = fs.readFileSync('./properties.env');
let config = JSON.parse(rawdata);

console.log('URL: ', config.url);
console.log('USER: ', config.user);
console.log('PASSWORD: ', config.password);
console.log('EXCELPATH: ', config.excelPath);
console.log('SECURITYTOKEN: ', config.securityToken);

test('Slow motion and video recording demo', async () => {
    // Lanzar el navegador Chromium con opciones específicas
    const browser = await chromium.launch({
        headless: false, // Ejecutar el navegador en modo visible
        slowMo: 1000 // Retardar la operación en milisegundos para visualizarla mejor
    });

    // Crear un nuevo contexto de navegador 
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/', // Directorio donde se guardarán los videos
            size: { width: 3024, height: 1964 } // Tamaño del video
        }
    });

    // Crear una nueva página dentro del contexto
    const page = await context.newPage();
    const Login = new loginPage(page);

    // Navegar a la página de inicio de sesión y realizar el inicio de sesión
    await Login.goToLoginPage();
    await Login.login('student', 'Password123');

    // Opciones adicionales para la captura de pantalla y el seguimiento de acciones
    // (Esta parte del código necesita ser adaptada según tus necesidades específicas)

    // Cerrar el contexto una vez que ya no sea necesario
    await context.close();
});
