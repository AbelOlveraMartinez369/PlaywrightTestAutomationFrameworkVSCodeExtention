import { test, expect } from '@playwright/test';

test('tutubeBot', async ({ page }) => {
    console.log("Automated Robot with Artificial Intelligence Started Successfully. Please sit down and watch how I do all your daily job.");

    const channelTotalVideosNumber = 163;
    let videoPosition = 1;
    let volumeMuteCounter = 0;
    let scrollDownCounter = 0;

    await page.goto('https://www.youtube.com/@qasdetsteammachine/videos');

    for (let i = 1; i <= channelTotalVideosNumber; i++) {
        for (scrollDownCounter = 0; scrollDownCounter < 14; scrollDownCounter++) {
            console.log(`Video Position: ${videoPosition}`);

            const videoTitleSelector = `ytd-grid-video-renderer:nth-child(${videoPosition}) h3 a`;
            const videoTitleElement = await page.$(videoTitleSelector);

            if (!videoTitleElement) {
                console.log('Element is not present');
                await page.evaluate(() => window.scrollBy(0, 333));
            }

            if (scrollDownCounter === 14 && !videoTitleElement) {
                console.log('Element is not present, the page will be refreshed');
                await page.reload();
            }

            if (videoTitleElement) {
                await page.waitForTimeout(3690);
                const videoTitle = await videoTitleElement.textContent();
                console.log(`Video Title: ${videoTitle}`);
                console.log('Element is present');

                await videoTitleElement.click();
                await page.reload();

                const accessButtonSelector = 'yt-playability-error-supported-renderers yt-button-renderer a paper-button';
                const accessButtonElement = await page.$(accessButtonSelector);

                if (accessButtonElement) {
                    console.log(`Access Button Text: ${await accessButtonElement.textContent()}`);
                    await page.waitForTimeout(1111);
                    await page.goto('https://www.youtube.com/@qasdetsteammachine/videos');
                    await page.waitForTimeout(3690);
                    videoPosition++;
                }

                if (!accessButtonElement) {
                    const volumeVideoButtonSelector = '#movie_player';
                    const volumeVideoButtonElement = await page.$(volumeVideoButtonSelector);

                    if (volumeMuteCounter === 0) {
                        await volumeVideoButtonElement.press('m');
                        volumeMuteCounter++;
                    }

                    await page.waitForTimeout(318000);
                    console.log(`Volume Button Text: ${await volumeVideoButtonElement.textContent()}`);
                    await page.waitForTimeout(1111);

                    const elapsedTimeInMilliseconds = Date.now() - cronometer;
                    const elapsedTimeInSeconds = Math.floor(elapsedTimeInMilliseconds / 1000);
                    const elapsedTimeInSecondsDisplay = elapsedTimeInSeconds % 60;
                    const elapsedTimeInMinutes = Math.floor(elapsedTimeInSeconds / 60);
                    const elapsedTimeInMinutesDisplay = elapsedTimeInMinutes % 60;
                    const elapsedTimeInHours = Math.floor(elapsedTimeInMinutes / 60);
                    const elapsedTimeInHoursDisplay = elapsedTimeInHours % 60;
                    const elapsedTimeInDays = Math.floor(elapsedTimeInHours / 24);
                    const elapsedTimeInDaysDisplay = elapsedTimeInDays % 24;
                    const elapsedTimeInWeeks = Math.floor(elapsedTimeInDays / 7);
                    const elapsedTimeInWeeksDisplay = elapsedTimeInWeeks % 7;
                    const elapsedTimeInYears = Math.floor(elapsedTimeInDays / 365);
                    const elapsedTimeInYearsDisplay = elapsedTimeInDays % 365;

                    console.log(`Elapsed Time Since the Automated Robot with Artificial Intelligence Started Successfully:\n
                        ${elapsedTimeInYearsDisplay} Years with:\n
                        ${elapsedTimeInWeeksDisplay} Weeks with:\n
                        ${elapsedTimeInDaysDisplay} Days with:\n
                        ${elapsedTimeInHoursDisplay} Hours with:\n
                        ${elapsedTimeInMinutesDisplay} Minutes with:\n
                        ${elapsedTimeInSecondsDisplay} Seconds and with:\n
                        ${elapsedTimeInMilliseconds} Milliseconds.\n`);

                    await page.goto('https://www.youtube.com/@qasdetsteammachine/videos');
                    await page.waitForTimeout(1111);
                    videoPosition++;
                }
            }

            if (videoPosition > channelTotalVideosNumber) {
                videoPosition = 1;
                i = 1;
                console.log("Finished Cycle\n");
                const elapsedTimeInMilliseconds2 = Date.now() - cronometer2;
                const elapsedTimeInSeconds2 = Math.floor(elapsedTimeInMilliseconds2 / 1000);
                const elapsedTimeInSecondsDisplay2 = elapsedTimeInSeconds2 % 60;
                const elapsedTimeInMinutes2 = Math.floor(elapsedTimeInSeconds2 / 60);
                const elapsedTimeInMinutesDisplay2 = elapsedTimeInMinutes2 % 60;
                const elapsedTimeInHours2 = Math.floor(elapsedTimeInMinutes2 / 60);
                const elapsedTimeInHoursDisplay2 = elapsedTimeInHours2 % 60;
                const elapsedTimeInDays2 = Math.floor(elapsedTimeInHours2 / 24);
                const elapsedTimeInDaysDisplay2 = elapsedTimeInDays2 % 24;
                const elapsedTimeInWeeks2 = Math.floor(elapsedTimeInDays2 / 7);
                const elapsedTimeInWeeksDisplay2 = elapsedTimeInWeeks2 % 7;
                const elapsedTimeInYears2 = Math.floor(elapsedTimeInDays2 / 365);
                const elapsedTimeInYearsDisplay2 = elapsedTimeInDays2 % 365;

                console.log(`Elapsed Time of the Automated Views Completed Cycle:\n
                    ${elapsedTimeInYearsDisplay2} Years with:\n
                    ${elapsedTimeInWeeksDisplay2} Weeks with:\n
                    ${elapsedTimeInDaysDisplay2} Days with:\n
                    ${elapsedTimeInHoursDisplay2} Hours with:\n
                    ${elapsedTimeInMinutesDisplay2} Minutes with:\n
                    ${elapsedTimeInSecondsDisplay2} Seconds and with:\n
                    ${elapsedTimeInMilliseconds2} Milliseconds.\n\n`);
                console.log("Starting a New Cycle\n");
                cronometer2 = 0;
            }
        }
    }
});
