import { ElementWrapper } from "../elementContainer/elementWrapper";
import { AbstractInputContext } from '../contexts/abstractInputContext';
import elementHandler from "../handlers/elementHandler";
import assert from '../handlers/assertionHandler';

export abstract class AbstractInputTester {

    //region Constructors

    constructor() {
        // do nothing
    }

    //endregion

    //region Shared Methods

    protected async testAlphaInput(input: ElementWrapper, context: AbstractInputContext, invalidElement: ElementWrapper) {
        if (!context.allowsAlpha) {
            this.testInputDoesNotAllowCharactersTobeEntered(input, context.stringAlpha);
            return;
        }

        await this.testInputAgainstValue(input, context, context.stringAlpha, invalidElement);
    }

    protected async testEmptyInput(input: ElementWrapper, context: AbstractInputContext, invalidElement: ElementWrapper) {
        await elementHandler.elementSendKeys(input, '');

        if (context.isRequired) {
            await assert.isDisplayed(invalidElement);
        } else {
            await assert.isNotDisplayed(invalidElement);
        }
    }

    protected async testInputAgainstEnteredValue(input: ElementWrapper, value: string, invalidElement: ElementWrapper) {
        await elementHandler.elementSendKeys(input, value);

        await assert.isElementTextEqualTo(input, value);

        if (invalidElement) {
            await assert.isNotDisplayed(invalidElement);
        }
    }

    protected async testInputAgainstValue(input: ElementWrapper, context: AbstractInputContext, value: string, invalidElement: ElementWrapper) {
        await this.testInputAgainstEnteredValue(input, value, invalidElement);
    }

    protected async testInputDoesNotAllowCharactersTobeEntered(input: ElementWrapper, invalidString: string) {
        await elementHandler.elementSendKeys(input, invalidString);

        await assert.isElementTextEqualTo(input, '');
    }

    protected async testNumericInput(input: ElementWrapper, context: AbstractInputContext, invalidInput: ElementWrapper) {
        if (!context.allowsNumeric) {
            await this.testInputDoesNotAllowCharactersTobeEntered(input, context.stringNumeric);
            return;
        }

        await this.testInputAgainstValue(input, context, context.stringNumeric, invalidInput);
    }

    protected async testSpecialInput(input: ElementWrapper, context: AbstractInputContext, invalidInput: ElementWrapper) {
        if (!context.allowsSpecial) {
            await this.testInputDoesNotAllowCharactersTobeEntered(input, context.stringSpecial);
            return;
        }

        await this.testInputAgainstValue(input, context, context.stringSpecial, invalidInput);
    }

    //endregion

}
