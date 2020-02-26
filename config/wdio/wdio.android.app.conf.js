const { join } = require('path');
const { config } = require('./wdio.shared.conf');

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // The defaults capabilities you need
        platformName: 'Android',
        maxInstances: 1,
        deviceName: 'Pixel_2_API_29',
        platformVersion: '10.0',
        orientation: 'PORTRAIT',
        automationName: 'UiAutomator2',
        app: join(process.cwd(), './build/app-release.apk'),
        // The extras capabilities
        noReset: true, // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
        // increase this time according the overall time of the tests (unit: seconds)
        newCommandTimeout: 60 * 60, // this fix the issue with Android -> An unknown server-side error occurred while processing the command. Original error: Could not proxy command to remote server. Original error: Error: socket hang up
        avd: 'Pixel_2_API_29',
        appPackage: 'com.<yourApp>',
        appActivity: 'com.<yourApp>.MainActivity',
        excludeDriverLogs: ['*'], // https://webdriver.io/docs/configurationfile.html => ['logcat', 'bugreport', 'server']

        // For W3C the appium capabilities need to have an extension prefix
        // http://appium.io/docs/en/writing-running-appium/caps/
        // This is 'appium:' for all Appium Capabilities which can be found here
    },
];

exports.config = config;