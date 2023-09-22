// Main lighthouse runner / fn
import lighthouse from 'lighthouse';

// Required for launching chrome instance
import * as chromeLauncher from 'chrome-launcher';


// So we can save output
import {writeFile} from 'fs/promises';


describe('lighthouse test', () => {
    it('should get get lighthouse result', async () => {
        try {
            // Launch instance of Chrome
            const chrome = await chromeLauncher.launch();

            // Gather results and report from Lighthouse
            const results = await lighthouse('https://example.com', {
                port: chrome.port,
                output: 'json'
            }, {
                extends: 'lighthouse:default',
                settings: {
                    onlyCategories: ['performance']
                }
            });

            console.log('Report is done for', results.lhr.finalDisplayedUrl);
            console.log('Performance score was', results.lhr.categories.performance.score * 100);

            // print result as mocha test output
            console.log(JSON.stringify(results.lhr, null, 2));

            // Kill Chrome
            await chrome.kill();
        } catch (error) {
            console.error('Error lighthouse:', error.message);
            throw error;
        }
    }).timeout(20000);
});
