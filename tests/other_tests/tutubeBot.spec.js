import { test, expect } from '@playwright/test';

test('YouTube Video Links', async ({ page }) => {
    // Navegar a la página del canal de YouTube
    await page.goto('https://www.youtube.com/@qasdetsteammachine/videos');
    await page.waitForLoadState('networkidle');

    // Obtener el número total de videos del canal utilizando el XPath
    const totalVideosElement = await page.$('xpath=//*[@id="videos-count"]');
    
    if (totalVideosElement) {
        const totalVideosText = await totalVideosElement.textContent();
        console.log('Valor de totalVideosElement:', totalVideosText); // Imprime el valor
        const totalVideos = parseInt(totalVideosText, 10);

        // Desplazarse hacia abajo para cargar todos los videos
        let previousHeight = 0;
        while (true) {
            await page.waitForTimeout(1000); // Esperar para asegurarse de que se cargue el contenido
            await page.keyboard.press('End'); // Desplazarse hacia abajo presionando la tecla "Fin"
            
            const currentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
            if (currentHeight === previousHeight) {
                // If the page height didn't change, it means you've reached the end.
                break;
            }
            previousHeight = currentHeight;
        }

        // Capturar enlaces de los títulos de los videos
        const videoLinks = await page.$$eval('a#video-title', (links) => links.map((link) => link.href));

        // Imprimir los enlaces de los títulos de los videos
        for (const link of videoLinks) {
            console.log(link);
        }
    } else {
        console.log('No se encontró el número total de videos.');
    }
});
