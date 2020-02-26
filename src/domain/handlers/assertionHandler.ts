import { ElementWrapper } from "../elementContainer/elementWrapper";
import elementHandler from "./elementHandler";

const dom = require('xmldom').DOMParser;
const assert = require('chai').assert;

export class Assert {
    // region Constructor

    constructor() {
        // do nothing
    }

    // endregion

    // region Properties

    public client: any;

    // endregion

    // region Public Methods

    public async doesNotInclude(expected: string, include: string) {
        assert.notInclude(expected, include);
    };

    public async listContains(expected: string, list: string[]) {
        assert.include(list, expected);
    }

    public async include(expected: string, include: string) {
        assert.include(expected, include);
    };

    public async isAtLeast(valueToCheck: number, valueToBeAtLeast: number) {
        assert.isAtLeast(valueToCheck, valueToBeAtLeast);
    };

    public async isDisabled(element: ElementWrapper) {
        assert.strictEqual(await elementHandler.getAttribute(element, 'enabled'), 'false', element.elementSelector + ' was not disabled');
    };

    public async isDisplayed(element: ElementWrapper) {
        assert.isTrue(await elementHandler.isDisplayed(element), element.elementSelector + ' was not displayed');
    };

    public async isElementTextEqualTo(element: ElementWrapper, expected: string) {
        assert.strictEqual(await elementHandler.getElementText(element), expected);
    };

    public async isEnabled(element: ElementWrapper) {
        assert.strictEqual(await elementHandler.getAttribute(element, 'enabled'), 'true', element.elementSelector + ' was not enabled');
    };

    public async isEqual(elementOne: any, elementTwo: any) {
        assert.isTrue(elementOne == elementTwo);
    }

    public async isNotDisplayed(element: ElementWrapper) {
        assert.isFalse(await elementHandler.isDisplayed(element), element.elementSelector + ' was not displayed');
    };

    public async isNotEqual(elementOne: any, elementTwo: any) {
        assert.isTrue(elementOne != elementTwo);
    }

    public async isTextEqualTo(actual: string, expected: string) {
        assert.strictEqual(actual, expected);
    };

    // endregion

}

// singleton
export default new Assert();