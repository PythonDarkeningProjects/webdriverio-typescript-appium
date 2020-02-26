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
        platformName: 'iOS',
        maxInstances: 1,
        deviceName: 'iPhone 11 Pro Max',
        platformVersion: '13.3',
        automationName: 'XCUITest',
        app: join(process.cwd(), './build/<yourApp>.app'),
        // The extras capabilities
        orientation: 'PORTRAIT',
        noReset: true, // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
        newCommandTimeout: 240,
        connectHardwareKeyboard: true,
        excludeDriverLogs: ['*'], // https://webdriver.io/docs/configurationfile.html => ['logcat', 'bugreport', 'server']

        // For W3C the appium capabilities need to have an extension prefix
        // This is `appium:` for all Appium Capabilities which can be found here
        // http://appium.io/docs/en/writing-running-appium/caps/
    },
];

exports.config = config;
