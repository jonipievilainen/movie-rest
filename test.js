// Main lighthouse runner / fn
import lighthouse from 'lighthouse';

// Required for launching chrome instance
import * as chromeLauncher from 'chrome-launcher';


// So we can save output
import {writeFile} from 'fs/promises';

(async () => {
    // Launch instance of Chrome
    const chrome = await chromeLauncher.launch();

    // Gather results and report from Lighthouse
    const results = await lighthouse('https://example.com', {
        port: chrome.port,
        output: 'html'
    }, {
        extends: 'lighthouse:default',
        settings: {
            onlyCategories: ['performance']
        }
    });

    // Save report to file
    await writeFile('./lighthouse-report.html', results.report);

    // Kill Chrome
    await chrome.kill();
})();
