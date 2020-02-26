Table of Contents

- [What is this repository for?](#markdown-header-what-is-this-repository-for)
- [Appium Setup](#markdown-header-appium-setup)
  - [Pre-requisites](#markdown-header-pre-requisites)
  - [Installing Appium](#markdown-header-installing-appium)
- [Appium Drivers](#markdown-header-appium-drivers)
  - [The XCUITest Driver for iOS](#markdown-header-the-xcuitest-driver-for-ios)
  - [The UiAutomator2 Driver for Android](#markdown-header-the-uiautomator2-driver-for-android)
    - [Android Emulator Setup](#markdown-header-android-emulator-setup)
    - [Real Device Setup](#markdown-header-real-device-setup)
- [Verifying the Installation](#markdown-header-verifying-the-installation)
- [Running Mock Tests](#markdown-header-running-mock-tests)
  - [Pre-requisites](#markdown-header-pre-requisites_1)
    - [Dependencies](#markdown-header-dependencies)
    - [Setup the iOS environment](#markdown-header-setup-the-ios-environment)
    - [Setup the Android environment](#markdown-header-setup-the-android-environment)
  - [Running a Mock Test for Android](#markdown-header-running-a-mock-test-for-android)
  - [Running a Mock Test for iOS](#markdown-header-running-a-mock-test-for-ios)
    - [Common issues running Appium on iOS](#markdown-header-common-issues-running-appium-on-ios)
- [Allure Test Report](#markdown-header-allure-test-report)
- [Build TimeClock Plus Applications Locally](#markdown-header-build-timeclock-plus-applications-locally)
  - [Pre-requisites](#markdown-header-pre-requisites_2)
  - [Build Android Application](#markdown-header-build-android-application)
  - [Build iOS Application](#markdown-header-build-ios-application)
- [Appium Desktop](#markdown-header-appium-desktop)
  - [Desired Capabilities](#markdown-header-desired-capabilities)
    - [Desired Capabilities for iOS](#markdown-header-desired-capabilities-for-ios)
    - [Desired Capabilities for Android](#markdown-header-desired-capabilities-for-android)
  - [Inspector Example with an iOS app](#markdown-header-inspector-example-with-an-ios-app)
  - [Project Structure](#markdown-header-project-structure)

# What is this repository for? #

This repository runs with the **Javascript WebdriverIO Client** in order to automate Android and iOS apps for TimeClock Plus

# Appium Setup #

## Pre-requisites ##
The following dependencies are required

- **brew**

Open a terminal and type the following command to install **brew**
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- **node**

```
brew install node
```

> Note: **npm** comes with the **node** installation

## Installing Appium ##

The following command will install appium globally in your system

```
npm install -g appium
```

Is highly recommended to install
[Appium desktop](https://github.com/appium/appium-desktop#user-content-download-appium-desktop)

# Appium Drivers #

## The XCUITest Driver for iOS ##

Please see the [Requirements and Support](http://appium.io/docs/en/drivers/ios-xcuitest/index.html#requirements-and-support)

In order to automate an app in the simulators **carthage** is must

```
sudo chown -R $(whoami) /usr/local/share/man/man8
brew install carthage
```

- Install [appium-idb](https://github.com/appium/appium-idb)

```
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
```

```
brew tap facebook/fb
brew install idb-companion
pip install fb-idb
```

- Install [AppleSimulatorUtils](https://github.com/wix/AppleSimulatorUtils)

```
brew tap wix/brew
brew install applesimutils
```

## The UiAutomator2 Driver for Android ##

Please see the [Requirements and Support](http://appium.io/docs/en/drivers/android-uiautomator2/index.html#requirements-and-support)

Install the following dependencies

- [Java SDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

- [Android Studio](https://developer.android.com/studio)

Add the following lines to the file `.bash_profile` located in your home directory
```
export ANDROID_SDK_ROOT="/Users/YOUR_USER/Library/Android/sdk"
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk1.8.0_231.jdk/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"
```

> Notice that you have to change the word `YOUR_USER` in the **ANDROID_SDK_ROOT** variable

### Android Emulator Setup ###

To run your application in the emulator follow this [steps](http://appium.io/docs/en/drivers/android-uiautomator2/index.html#emulator-setup)

### Real Device Setup ###

To run your application in real devices follow this [steps](http://appium.io/docs/en/drivers/android-uiautomator2/index.html#real-device-setup)

# Verifying the Installation #

To verify that all of Appium's dependencies are met you can use `appium-doctor`. Install it with

```
npm install -g appium-doctor
```

Now run the `appium-doctor` command, supplying the `--ios` or `--android` flags to verify that all of the dependencies are set up correctly.

At this point you noticed that some optional dependencies are missing, you can install them with the following commands:

- General optional dependencies
```
brew install ffmpeg
npm install -g mjpeg-consumer
export OPENCV4NODEJS_DISABLE_AUTOBUILD=1
brew install opencv@4
npm i -g opencv4nodejs
```

- bundletool.jar dependency

1. Download the latest bundletool.jar from the [oficial site](https://github.com/google/bundletool/releases)
2. Rename the file as `bundletool.jar`
3. Create the following folder `mkdir -p /Users/$(whoami)/Library/Android/sdk/bundle-tool`
4. Move the file `bundletool.jar` to the created folder
5. Make it executable `chmod +x bundletool.jar`
6. Modify `PATH` variable in the file **.bash_profile** to add it `export PATH="$JAVA_HOME/bin:$ANDROID_HOME/bundle-tool:$PATH"`
7. Verify the installation with the following steps
   1. Open a new terminal
   2. type the command: `which bundletool.jar`

> if the step 7 returns the absolute bundletool's path, thus it is ok

Now running `appium-doctor` either with the `--ios` or the `--android` option should not report missing dependencies

# Running Mock Tests #

As a test purpose follow the next steps to run some basic test on `Android` and `iOS` OS

## Pre-requisites ##

### Dependencies ###

Install the required dependencies

```
npm install
```

### Setup the iOS environment ###

Open the file located in: `helpers/caps.js` and set the following:

- for the `cost iosCaps` dictionary set the following keys
  -  `deviceName` set to one device that is currently installed as simulator in your machine, e.g "**iPhone 8**" (See the current devices installed with the command: `xcrun simctl list | grep -e "== Devices ==" -e "Shutdown" -e "Booted"`)
  -  `platformVersion` set to one iOS OS Version image downloaded with "Xcode Simulator", e.g: "**13.1**" (See the current iOS images in your system with the command `xcodebuild -showsdks`)

### Setup the Android environment ###

The only thing for the moment required is that an emulator is open

## Running a Mock Test for Android ##

From the root folder type the following command

```
./node_modules/mocha/bin/mocha test/basic/android/android-basic.js
```

If everything is ok, you should be able to see the following message in the terminal at the end of the test:

```
    ✓ should create and destroy a session (294ms)


  1 passing (13s)
```

> Be aware that before to run the test, the emulator needs to be open

## Running a Mock Test for iOS ##

From the root folder type the following command

```
./node_modules/mocha/bin/mocha test/basic/ios/ios-basic.js
```

If everything is ok, you should be able to see the following message in the terminal at the end of the test:

```
    ✓ should click a button that opens an alert (925ms)


  2 passing (28s)
```

> Unlike android, the iOS simulator does not need to be open

### Common issues running Appium on iOS ###

Some `Appium` versions like [v1.15.1](https://github.com/appium/appium/releases/tag/v1.15.1) and [v1.15.0](https://github.com/appium/appium/releases/tag/v1.15.0) have issues running together with `IDB`, if you have the following issue on execution time uninstall IDB.

```
[debug] [IDB]             Make sure both host and port are correct and reachable
```

- Uninstall idb-companion

```
brew uninstall idb-companion
```

> There is an reported issue [here](https://github.com/appium/appium-idb/issues/18)

# Allure Test Report #

In order to get the [Allure](http://allure.qatools.ru/) HTML report, first we need the **xml** execution files.

The following command will run all the test cases related with iOS/Android system under the folder `src/iOS` | `src/Android` and the folder `allure-results` will be created (in the root directory) to storage all the execution **xml** files

```
npm run testiOS # for iOS test cases
npm run testiOS # for Android test cases
```

Once the tests have finished, run the following command to get the report:

```
npm run report
```

The above command will perform the follwing steps:
1. Create the folder `allure-report` in the root directory (if any)
2. Open the HTML report in a local server with the default OS browser in your machine

> Run the test cases for iOS and Android to get a full Allure report

# Build TimeClock Plus Applications Locally #
Performing this approach you will get the debug versions of the applications

## Pre-requisites ##

1. Clone the repository
```
git clone someRepo
```

2. Checkout to the desired branch
```
git checkout <yourBranch>
```

> Note: for **Android** the App must not be installed in the emulator, otherwise the compilation will fail

## Build Android Application ##

### Debug Mode ###

In the root folder perform the following commands:

```
yarn install
yarn start
react-native run-android
```

### Release Mode ###

Follow the next official procedure from React Native
- https://facebook.github.io/react-native/docs/signed-apk-android


After the build is successful the **APK** is under the followinng folder: `{rootFolder}/android/app/build/outputs/apk/debug or release`

## Build iOS Application ##

1. In the root folder perform the following commands:

```
yarn install
react-native link
cd ios && pod install
```

2. Open Xcode and select the following options
   1. Open another project (select the file `{rootProject}/ios/<yourApp>.xcworkspace`)
   2. In the upper right corner click on the device icon and select the desired simulator

**To build and iOS app for release mode follow the next steps**

1. On the Xcode select: Product > Scheme > Edit Scheme ..
2. Change Build Configuration from Debug to Release and close it

[Help link](https://stackoverflow.com/questions/5706548/how-do-i-create-a-release-build-in-xcode)

3. Click on the Play button in the upper right corner to build the project

The build will be created at `~/Library/Developer/Xcode/DerivedData`

If the build is successful, the app will be at `~/Library/Developer/Xcode/DerivedData/<yourApp>-dvxamtpiqakwogarovbwiagepzxj/Build/Products/Debug-iphonesimulator/<yourApp>.app`

This app will be installed automatically in the simulator

**Optional**:  At this point the `<yourApp>.app` is ready to install in any simulator you want without make the build again, only follow the next steps:

- Install ios-sim

```
brew install ios-sim
```

- Then run
```
# First, find the device type
ios-sim showdevicetypes
# Example using iPhone 7
ios-sim launch --devicetypeid "iPhone-7, 13.1" /path/to/<yourApp>.app
```


# Appium Desktop #

[Appium Desktop](https://github.com/appium/appium-desktop) has a very useful tool named **[The Inspector](https://github.com/appium/appium-desktop#user-content-the-inspector)**

 The Inspector is a visual representation of the state of your application along with the ability to perform certain interactions in your application through Appium

## Desired Capabilities ##

[Desired Capabilities](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/caps.md) are keys and values encoded in a JSON object, sent by Appium clients to the server when a new automation session is requested

The following are examples to open a new automation session for the App

### Desired Capabilities for iOS ###

```
{
  "platformName": "iOS",
  "platformVersion": "13.1",
  "deviceName": "iPhone 7",
  "app": "/path/to/your/app/<yourApp>.app",
  "automationName": "XCUITest"
}
```

### Desired Capabilities for Android ###

```
{
  "platformName": "Android",
  "platformVersion": "10.0",
  "deviceName": "Pixel_API_29",
  "automationName": "UiAutomator2",
  "app": "/path/to/your/apk/app-debug.apk",
  "appActivity": "com.<yourApp>.MainActivity",
  "appPackage": "com.<yourApp>"
}
```

> `appActivity` and `appPackage` keys are needed as workaround for the bug [incorrect package and activity name](https://discuss.appium.io/t/android-on-appium-1-6-incorrect-package-and-activity-error/12608)


## Inspector Example with an iOS app ##

The following image shows a [selector strategy](http://appium.io/docs/en/commands/element/find-elements/index.html#selector-strategies) to locate elements in the app

 ![inspector_example_ios.png](.img/inspector_example_ios.png)

# Project Structure #

The following image represents the folder structure which will be detailed below

![folderStructure](.img/folderStructure.png)

- **build**: Is the folder where should the applications be
- **config**: Is the folder that stores the configuration files
    - **helpers**: Is the folder that stores the `js` files with the information of the app to run during a test execution and their capabilities
    - **wdio**: Is the folder that stores the webdriverio configuration files
- **src**
    - **out**: Is the folder that will store the compiled `ts` files converted to `js` files
    - **test**: Is the folder to store all the automated test cases
    - **mocha.opts**: Is the file that stores the mocha options related
- **package.json**: Is the file that stores the project scripts and node dependencies
- **tsconfig.json**: Is the file that stores the `TypeScript` configuration