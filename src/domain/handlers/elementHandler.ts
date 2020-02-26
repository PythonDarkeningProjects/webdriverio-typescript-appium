/** webdriver.io (protocols)
 * 
 * findElement: [https://webdriver.io/docs/api/webdriver.html#findelement]
 * isElementDisplayed: [https://webdriver.io/docs/api/webdriver.html#iselementdisplayed]
 * swipeGesture: [https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-xctest-mobile-gestures.md#user-content-mobile-swipe]
 * Appium mobile commands: [http://appium.io/docs/en/commands/mobile-command/]
 * Android touchActions: [https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/touch-actions.md]
 * 
 **/
import navigationHandler from '../../domain/handlers/navigationHandler';
import xpath = require('xpath');
import { ElementLocator } from '../locators/elementLocators';
import { ElementWrapper } from "../elementContainer/elementWrapper";

const sleepfor = require('sleepfor');
const dom = require('xmldom').DOMParser;

export class ElementHandler {
    // region constructors

    constructor() {
        // do nothing
    }

    // endregion

    // region properties

    public client: any;

    // endregion

    // region private methods

    private async getElementID(element: ElementWrapper) {
        let elementID = await this.client.findElement(element.strategy, element.elementSelector);
        return elementID.ELEMENT;
    }

    private async getElementIDByIndex(element: ElementWrapper, index: number) {
        let elementID = await this.client.findElements(element.strategy, element.elementSelector);
        return elementID[index].ELEMENT;
    }

    private async isElementRendered(element: ElementWrapper) {
        // Determines if an element is rendered in the current screen
        return await this.getElementID(element) === undefined ? false : true;
    }

    // endregion

    // region public methods

    public async isDisplayed(element: ElementWrapper) {
        // Determines the visibility of an element which is guided by what is perceptually visible to the human eye.
        if (!await this.isElementRendered(element)) return false;
        return this.client.isElementDisplayed(await this.getElementID(element));
    }

    public async isDisplayedByID(elementID: String) {
        /* Determines the visibility of an element which is guided by what is perceptually visible to the human eye.
        * - Returns:
        * - <Boolean> isDisplayed: true or false based on the visible state
        */
        return await this.client.isElementDisplayed(elementID);
    }

    public async getElementText(element: ElementWrapper) {
        /* This intends to return an element’s text "as rendered"
        * Returns:
        * - <String> text: The visible text of the element (including child elements)
        */
        //if(!await this.isElementRendered(element)) return false;
        return this.client.getElementText(await this.getElementID(element));
    }

    public async getElementTextByID(elementID: string) {
        /* This intends to return an element’s text "as rendered"
        * Returns:
        * - <String> text: The visible text of the element (including child elements)
        */
        return this.client.getElementText(elementID);
    }

    public async isDisplayedFromList(elementID: string) {
        // Determines the visibility of an element which is guided by what is perceptually visible to the human eye.
        return this.client.isElementDisplayed(elementID);
    }

    public async clickOnElementFromList(elementID: string) {
        await this.client.elementClick(elementID);
    }

    public async clickOnElement(element: ElementWrapper, clicks = 1) {
        /* Requirement: previous call to Find Element(s)
        * params:
        * - clicks: clicks to perform while the element is visible to the human eye (default = 1)
        */
        for (let _i = 0; _i < clicks; _i++) {
            if (!await this.isDisplayed(element)) break;
            await this.client.elementClick(await this.getElementID(element));
        }
    }

    public async clickOnElementAndAcceptAlert(element: ElementWrapper) {
        // waits for element to be displayed *max 9 seconds* 
        // clicks on the element, then waits for an alert and accepts it
        await this.waitForElementAppears(element);
        await this.clickOnElement(element);
        await this.acceptAlert();
    }

    public async clickOnElementByIndex(element: ElementWrapper, clicks = 1, index: number) {
        /* Requirement: previous call to Find Element(s)
        * params:
        * - clicks: clicks to perform while the element is visible to the human eye (default = 1)
        */
        for (let _i = 0; _i < clicks; _i++) {
            if (!await this.isDisplayed(element)) break;
            await this.client.elementClick(await this.getElementIDByIndex(element, index));
        }
    }

    public async elementSendKeys(element: ElementWrapper, keys: string) {
        // Requirement: previous call to Find Element(s)
        await this.client.elementSendKeys(await this.getElementID(element), keys);
    }

    public async getComponentsByXpath(element: ElementWrapper) {
        let elements: string[] = await this.client.findElements('xpath', element.elementSelector);
        let accessibilityIDs: string[] = [];

        Object.keys(elements).forEach(function (key) {
            accessibilityIDs.push(elements[key].ELEMENT);
        });

        return accessibilityIDs;
    }

    public async getPageSource() {
        /* Get the XML of a screen */
        let pageSource = await this.client.getPageSource();
        return pageSource;
    }

    public async findElementsFromDomUsingXpath(element: ElementWrapper) {
        /** A faster way to get the accessibility IDs in a screen
         *
         * return: the accessibilitiy IDs from the elements found
         * Notes:
         * 1. iOS render all the elements in the DOM (the elements found maybe could not be visible in the screen)
         * 2. Android only render the visible elements in the DOM
         * 3. The DOM does have the IDs of the elements
        */
        let document = new dom().parseFromString(await this.getPageSource());
        let elements = xpath.select(element.elementSelector, document);
        let accessibilityIDs: ElementWrapper[] = [];

        let accessibilityID: number = (this.client.capabilities.automationName.localeCompare('XCUITest') === 0) ? 1 : 4;
        Object.values(elements).forEach(function (value) {
            accessibilityIDs.push(ElementLocator.singleton.getElementByAccessibilityID(value['attributes'][accessibilityID]['value']));
        });

        return accessibilityIDs;
    }

    public async getElementsTextFromDomUsingXpath(element: ElementWrapper) {
        /** A faster way to get all the elements text from a list using the DOM
         *
         * Params:
         * - element: the XPATH of the element
         *
         * - Returns:
         *   a list of elements text
         */

        let document = new dom().parseFromString(await this.getPageSource());
        let elements = xpath.select(element.elementSelector, document);
        let elementsText: string[] = [];

        let elementTextIndex: number = (this.client.capabilities.automationName.localeCompare('XCUITest') === 0) ? 2 : 0; // TBD for android (BUG: https://timeclockplus.atlassian.net/browse/MC-639)
        Object.values(elements).forEach(function (value) {
            elementsText.push(value['attributes'][elementTextIndex]['value']);
        });

        return elementsText;

    }

    public async getAttribute(element: ElementWrapper, attribute: string) {
        // Requirement: previous call to Find Element(s)
        let attr = await this.client.getElementAttribute(await this.getElementID(element), attribute);
        return attr;
    }

    public async moveToElement(elementID: string, xoffset: number, yoffset: number) {
        /* Requirement: previous call to Find Element(s)
        * - xoffset: the x offset in pixels to scroll by
        * - yoffset: the y offset in pixels to scroll by
        */
        await this.client.moveToElement(elementID, xoffset, yoffset);
    }

    public async getElementLocationFromList(element: ElementWrapper) {
        let location = await this.client.getElementLocation(await this.getElementID(element));
        return location;
    }

    public async swipeGestureiOS(direction: string, swipes = 1) {
        /* IOS (XCUITest Only) Emulates single swipe with one finger
        * params:
        * - direction: either 'up', 'down', 'left' or 'right'
        * - swipes: times quantity to perform a swipe gesture (default = 1)
        * Note: The application element will be used to perform the swipe gesture
        */

        let params = { direction: direction };

        for (let _i = 0; _i < swipes; _i++) await this.client.execute("mobile: swipe", params);
    }

    public async scrollGestureiOS(direction: string, swipes = 1) {
        /* IOS (XCUITest Only) Scrolls the element or the whole screen
        * params:
        * - direction: either 'up', 'down', 'left' or 'right'
        * - swipes: times quantity to perform a swipe gesture (default = 1)
        * Note:
        *   - The application element will be used to perform the swipe gesture
        *   - The directions are inverted
        *   - By default the scroll is perfomed twice in each iteration
        */

        let params = { direction: direction };

        for (let _i = 0; _i < swipes; _i++) await this.client.execute("mobile: scroll", params)
    }

    public async swipeGestureAndroid(direction: string, swipes = 1, coordinates: object) {
        /* Android (UIAutomator2 Only) Simulates a user pressing down on an element, sliding their finger
        *  to another position, and removing their finger from the screen
        * params:
        * - direction: either 'up' or 'down'
        * - swipes: times quantity to perform a swipe gesture (default = 1)
        * - coordinates: an object with x and y coordinates of the initial position to start dragging
        */
        let options: Object[] = [{ action: 'press', x: coordinates['x'], y: coordinates['y'] }];

        switch (direction) {
            case 'up':
                let upCoordinate: number = -100;

                for (let _i = 0; _i < swipes; _i++) {
                    options.push({ action: 'moveTo', x: upCoordinate, y: upCoordinate });
                    options.push({ action: 'wait', ms: 500 });
                    upCoordinate += -100;
                }
                break;
            case 'down':
                let downCoordinate: number = 100;

                for (let _i = 0; _i < swipes; _i++) {
                    options.push({ action: 'moveTo', x: downCoordinate, y: downCoordinate });
                    options.push({ action: 'wait', ms: 500 });
                    downCoordinate += 100;
                }
                break;
            default:
                throw new Error('Invalid direction!');
        }

        options.push['release'];

        await this.client.touchAction(options);
    }

    public async acceptAlert(times: number = 1) {
        for (let i: number = 0; i < times; i++) {
            await this.waitForElementAppears(navigationHandler.alert);
            await this.client.acceptAlert();
        }
    }

    public async dismissAlert(times: number = 1) {
        for (let i: number = 0; i < times; i++) {
            await this.waitForElementAppears(navigationHandler.alert);
            await this.client.dismissAlert();
        }
    }

    public async getAlertText() {
        let alertText: string = await this.client.getAlertText();
        return alertText;
    }

    public async getWindowHeight() {
        let windowObj = await this.client.getWindowRect();
        return windowObj['height'];
    }

    public async getWindowWidth() {
        let windowObj = await this.client.getWindowRect();
        return windowObj['width'];
    }

    public async getWindowRect() {
        let windowObj: any = await this.client.getWindowRect();
        return windowObj;
    }

    public async hideKeyboard() {
        if (await this.client.isKeyboardShown()) await this.client.hideKeyboard();
    }

    public async hideNumericKeyboard(element: ElementWrapper) {
        if (await this.client.isKeyboardShown()) await this.clickOnElement(element);
    }

    public async elementClearAndroid(element: ElementWrapper) {
        if (await this.isDisplayed(element)) await this.client.elementClear(await this.getElementID(element));
    }

    public async elementCleariOS(element: ElementWrapper, clicks = 1) {
        /* params:
        * - clicks: clicks to perform while the element is visible to the human eye (default = 1) 
        */
        if (await this.client.isKeyboardShown()) await this.clickOnElement(element, clicks);
    }

    public async waitForElementAppears(element: ElementWrapper, gracefulTime: number = 0) {
        //TODO: implement this function in a smart way
        let attemps = 0;
        while (attemps < 9) {
            sleepfor(1000 + gracefulTime);
            if (await this.isDisplayed(element)) break;
            attemps++;
        }
    }

    // endregion
}

// singleton
export default new ElementHandler()