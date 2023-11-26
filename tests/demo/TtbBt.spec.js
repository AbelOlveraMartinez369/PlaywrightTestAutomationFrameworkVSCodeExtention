// @ts-check
const { test, expect } = require('@playwright/test');

test('Automated Views Test', async ({ page }) => {
  const cronometer = Date.now();
  const cronometer2 = Date.now();
  const channelTotalVideosNumber = 25;
  let videoPosition = 1;
  let volumeMuteCounter = 0;

  console.log('Automated Robot with Artificial Intelligence Started Successfully. Please sit down and watch how I do all your daily job');

  await page.goto('https://www.youtube.com/@qasdetsteammachine/videos');

  for (let i = 1; i <= channelTotalVideosNumber; i++) {
    console.log(`Position Counter at the Start of the Loop: ${i}`);

    for (let scrollDownCounter = 0; scrollDownCounter < 14; scrollDownCounter++) {
      console.log(`Video Position: ${videoPosition}`);

      const videoInteger = await page.$eval(`xpath=/html/body/ytd-app/div/ytd-page-manager/ytd-browse/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer/div[3]/ytd-grid-renderer/div[1]/ytd-grid-video-renderer[${videoPosition}]/div[1]/div[1]/div[1]/h3/a`, el => el ? 1 : 0);

      if (videoInteger === 0) {
        console.log('Element is not present');
        await page.evaluate(`scroll(0, 99999)`);
      }

      if (scrollDownCounter === 13 && videoInteger === 0) {
        console.log('Element is not present, the page will be refreshed');
        await page.reload();
      }

      if (videoInteger !== 0) {
        await page.waitForTimeout(3690);
        const videoTitle = await page.$(`xpath=/html/body/ytd-app/div/ytd-page-manager/ytd-browse/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer/div[3]/ytd-grid-renderer/div[1]/ytd-grid-video-renderer[${videoPosition}]/div[1]/div[1]/div[1]/h3/a`);
        console.log(`Video Title: ${await videoTitle.textContent()}`);

        console.log('Element is present');

        await videoTitle.click();
        await page.reload();

        const accessButtonInteger = await page.$$eval('xpath=/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/div[1]/yt-playability-error-supported-renderers/div/yt-player-error-message-renderer/div/div[2]/div[2]/yt-button-renderer/a/paper-button', buttons => buttons.length);

        console.log(`Access Button Integer Text: ${accessButtonInteger}`);

        if (accessButtonInteger !== 0) {
          const accessButton = await page.$('xpath=/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/div[1]/yt-playability-error-supported-renderers/div/yt-player-error-message-renderer/div/div[2]/div[2]/yt-button-renderer/a/paper-button');
          console.log(`Access Button Text: ${await accessButton.textContent()}`);
          await page.goto('https://www.youtube.com/@qasdetsteammachine/videos');
          await page.waitForTimeout(3690);
          videoPosition += 1;
        }

        if (accessButtonInteger === 0) {
          const volumeVideoButton = await page.$('id=movie_player');
          const volumeVideoButtonInteger = await page.$$eval('id=movie_player', buttons => buttons.length);

          console.log(`Volume Button Text: ${await volumeVideoButton.textContent()}`);

          if (volumeMuteCounter === 0) {
            await volumeVideoButton.press('m');
            volumeMuteCounter++;
          }

          await page.waitForTimeout(318000);
          console.log(`Volume Button Text: ${await volumeVideoButton.textContent()}`);
          await page.waitForTimeout(1111);

          const elapsedTimeInMilliseconds = Date.now() - cronometer;
          const elapsedTimeInSeconds = Math.floor(elapsedTimeInMilliseconds / 1000);
          console.log(`\n\n\nElapsed Time Since the Automated Robot with Artificial Intelligence Started Successfully:\n\n\n${elapsedTimeInSeconds} Seconds\n\n\n`);

          await page.goto('https://www.youtube.com/@qasdetsteammachine/videos');
          await page.waitForTimeout(1111);
          videoPosition += 1;
        }
      }

      if (videoPosition > channelTotalVideosNumber) {
        videoPosition = 1;
        i = 1;
        console.log('Finished Cycle\n');
        const elapsedTimeInMilliseconds2 = Date.now() - cronometer2;
        const elapsedTimeInSeconds2 = Math.floor(elapsedTimeInMilliseconds2 / 1000);
        console.log(`\n\n\nElapsed Time of the Automated Views Completed Cycle:\n\n\n${elapsedTimeInSeconds2} Seconds\n\n\n`);
        console.log('Starting a New Cycle\n');
        cronometer2 = 0;
      }
    }
  }
});
