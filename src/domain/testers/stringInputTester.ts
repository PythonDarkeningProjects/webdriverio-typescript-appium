import { AbstractInputTester } from './abstractInputTester';
import { ElementWrapper } from '../elementContainer/elementWrapper';
import { StringInputContext } from '../contexts/stringInputContext';
import elementHandler from "../handlers/elementHandler";
import assert from '../handlers/assertionHandler';

export class StringInputTester extends AbstractInputTester {

    public static singleton = new StringInputTester();

    //region Constructors

    constructor() {
        super();
    }

    //endregion

    //region Public Methods

    public async testStringInput(input: ElementWrapper, isRequired: boolean, mustBeUpperCase: boolean, allowsAlpha: boolean, allowsNumeric: boolean, allowsSpecial: boolean, maxLength: number, invalidElement?: ElementWrapper) {
        let context = new StringInputContext(mustBeUpperCase, allowsAlpha, allowsNumeric, allowsSpecial, isRequired, maxLength, '');
        await this.testInputs(input, context, invalidElement);
    }

    //endregion

    //region Abstract Methods

    protected async testInputDoesNotAllowCharactersTobeEntered(input: ElementWrapper, invalidString: string) {
        // exercise
        await elementHandler.elementSendKeys(input, invalidString);
        await elementHandler.hideKeyboard();

        // post-conditions
        await assert.isElementTextEqualTo(input, '');
    }

    protected async testCombinationInputs(input: ElementWrapper, context: StringInputContext) {
        // exercise
        await elementHandler.elementSendKeys(input, context.stringValidCombinational);
        await elementHandler.hideKeyboard();

        // mid-conditions
        if (context.allowsAlpha) {
            await assert.include(await elementHandler.getElementText(input), context.combinationAlphaPart);
        } else {
            await assert.doesNotInclude(await elementHandler.getElementText(input), context.combinationAlphaPart);
        }

        if (context.allowsSpecial) {
            await assert.include(await elementHandler.getElementText(input), context.combinationSpecialPart);
        } else {
            await assert.doesNotInclude(await elementHandler.getElementText(input), context.combinationSpecialPart);
        }

        if (context.allowsNumeric) {
            await assert.include(await elementHandler.getElementText(input), context.combinationNumericPart);
        } else {
            await assert.doesNotInclude(await elementHandler.getElementText(input), context.combinationNumericPart);
        }
    }

    protected async testInputAgainstEnteredValue(input: ElementWrapper, value: string, invalidElement: ElementWrapper) {
        // exercise
        await elementHandler.elementSendKeys(input, value);
        await elementHandler.hideKeyboard();

        // mid-conditions
        await assert.isElementTextEqualTo(input, value);

        if (invalidElement) {
            await assert.isNotDisplayed(invalidElement);
        }
    }

    protected async testInputAgainstEnteredValueSelectOption(input: ElementWrapper, context: StringInputContext, value: string, invalidElement: ElementWrapper) {
        // exercise
        await elementHandler.elementSendKeys(input, value);
        await elementHandler.hideKeyboard();

        // mid-conditions
        await assert.isElementTextEqualTo(input, value);

        if (invalidElement) {
            await assert.isDisplayed(invalidElement);
        }
    }

    protected async testInputAgainstValueSelect(input: ElementWrapper, context: StringInputContext, value: string, invalidElement: ElementWrapper) {
        await this.testInputAgainstEnteredValueSelectOption(input, context, value, invalidElement);
    }

    protected async testInputAgainstValue(input: ElementWrapper, context: StringInputContext, value: string, invalidElement: ElementWrapper) {
        await this.testInputAgainstEnteredValue(input, value, invalidElement);
    }

    protected async testInputMaxLength(elementFinder: ElementWrapper, validInput: string) {
        // set-up
        let additionalCharacter = !validInput ? validInput[0] : '';
        let overflowString = validInput + additionalCharacter;
        await elementHandler.elementSendKeys(elementFinder, overflowString);

        // mid-conditions
        await assert.isElementTextEqualTo(elementFinder, validInput);
    }

    protected async testNumericInput(input: ElementWrapper, context: StringInputContext, invalidElement: ElementWrapper) {
        if (!context.allowsNumeric) {
            await this.testInputDoesNotAllowCharactersTobeEntered(input, context.stringNumeric);
            return;
        }
        await this.testInputAgainstValue(input, context, context.stringNumeric, invalidElement);
    }

    protected async testSpecialInput(input: ElementWrapper, context: StringInputContext, invalidElement: ElementWrapper) {
        if (!context.allowsSpecial) {
            await this.testInputDoesNotAllowCharactersTobeEntered(input, context.stringSpecial);
            return;
        }
        await this.testInputAgainstValue(input, context, context.stringSpecial, invalidElement);
    }

    protected async testSpecialInputSelect(input: ElementWrapper, context: StringInputContext, invalidElement: ElementWrapper) {
        if (!context.allowsSpecial) {
            await this.testInputDoesNotAllowCharactersTobeEntered(input, context.stringSpecial);
            return;
        }
        await this.testInputAgainstValueSelect(input, context, context.stringSpecial, invalidElement);
    }

    protected async testInputs(input: ElementWrapper, context: StringInputContext, invalidElement: ElementWrapper) {
        await this.testAlphaInput(input, context, invalidElement);
        await this.testNumericInput(input, context, invalidElement);
        await this.testSpecialInput(input, context, invalidElement);
        await this.testCombinationInputs(input, context);
        await this.testInputAgainstValue(input, context, context.stringValidCombinational, invalidElement);
    }

    protected async testInputsForSelect(input: ElementWrapper, context: StringInputContext, invalidElement: ElementWrapper) {
        await this.testAlphaInput(input, context, invalidElement);
        await this.testNumericInput(input, context, invalidElement);
        await this.testSpecialInputSelect(input, context, invalidElement);
        await this.testCombinationInputs(input, context);
        await this.testInputAgainstValueSelect(input, context, context.stringValidCombinational, invalidElement);
    }

    //endregion

}
