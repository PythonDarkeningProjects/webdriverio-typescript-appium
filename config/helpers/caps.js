const iosCaps = {
  platformName: 'iOS',
  automationName: 'XCUITest',
  deviceName: process.env.IOS_DEVICE_NAME || 'iPhone 11 Pro Max',
  platformVersion: process.env.IOS_PLATFORM_VERSION || '13.3',
  app: undefined // Will be added in tests
};

const iosWebCaps = {
  platformName: 'iOS',
  automationName: 'XCUITest',
  deviceName: process.env.IOS_DEVICE_NAME || 'iPhone 11 Pro Max',
  platformVersion: process.env.IOS_PLATFORM_VERSION || '13.3',
  browserName: 'Safari'
};

// Leave the Android platformVersion blank and set deviceName to a random string (Android deviceName is ignored by Appium but is still required)
// If we're using SauceLabs, set the Android deviceName and platformVersion to the latest supported SauceLabs device and version
const DEFAULT_ANDROID_DEVICE_NAME = process.env.SAUCE
  ? 'Android GoogleAPI Emulator'
  : 'Pixel_3a_API_29';
const DEFAULT_ANDROID_PLATFORM_VERSION = process.env.SAUCE ? '7.1' : '10.0';

const androidCaps = {
  platformName: 'Android',
  automationName: 'UiAutomator2',
  // increase this time according the overall time of the tests (unit: seconds)
  newCommandTimeout: 60 * 60, // this fix the issue with Android -> An unknown server-side error occurred while processing the command. Original error: Could not proxy command to remote server. Original error: Error: socket hang up
  deviceName: process.env.ANDROID_DEVICE_NAME || DEFAULT_ANDROID_DEVICE_NAME,
  platformVersion:
    process.env.ANDROID_PLATFORM_VERSION || DEFAULT_ANDROID_PLATFORM_VERSION,
  app: undefined, // Will be added in tests
  appActivity: 'com.<yourApp>.MainActivity',
  appPackage: 'com.<yourApp>.MobileClock'
};

const androidWebCaps = {
  platformName: 'Android',
  automationName: 'UiAutomator2',
  deviceName: process.env.ANDROID_DEVICE_NAME || DEFAULT_ANDROID_DEVICE_NAME,
  platformVersion:
    process.env.ANDROID_PLATFORM_VERSION || DEFAULT_ANDROID_PLATFORM_VERSION,
  browserName: 'chrome'
};

const serverConfig = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: process.env.APPIUM_PORT || 4723,
  logLevel: 'info'
};

module.exports = {
  iosCaps,
  androidCaps,
  iosWebCaps,
  androidWebCaps,
  serverConfig
}     