import { AbstractInputTester } from './abstractInputTester';
import { AbstractNumericInputContext } from '../utility/abstractNumericInputContext';
import { DecimalInputContext } from '../utility/decimalInputContext';
import { ElementWrapper } from '../elementContainer/elementWrapper';
import { IntegerInputContext } from '../utility/integerInputContext';
import elementHandler from "../handlers/elementHandler";
import assert from '../handlers/assertionHandler';

export class NumericInputTester extends AbstractInputTester {

    //region Constructors

    constructor() {
        super();
        // do nothing
    }

    //endregion

    //region Public Methods

    public async testDecimalInput(input: ElementWrapper, isRequired: boolean, minValue: number, maxValue: number, maxCharactersBeforeDecimal: number, maxCharactersAfterDecimal: number, invalidElement?: ElementWrapper) {
        let context = new DecimalInputContext(isRequired, minValue, maxValue, maxCharactersAfterDecimal, maxCharactersBeforeDecimal);
        await this.testDecimalInputs(input, context, invalidElement);
    }

    public async testIntegerInputWithMinAndMaxValue(input: ElementWrapper, isRequired: boolean, maxValue: number, minValue: number, invalidElement?: ElementWrapper) {
        let context = new IntegerInputContext(isRequired, maxValue, minValue);
        await this.testIntegerInputs(input, context, invalidElement);
    }

    //endregion

    //region Overridden Methods

    protected async testInputs(input: ElementWrapper, context: AbstractNumericInputContext, invalidElement: ElementWrapper) {
        await this.testAlphaInput(input, context, invalidElement);
        await this.testSpecialInput(input, context, invalidElement);
        await this.testNumericInput(input, context, invalidElement);
        await this.testEmptyInput(input, context, invalidElement);
    }

    //endregion

    //region Helper Methods

    private async testDecimalInputs(input: ElementWrapper, context: DecimalInputContext, invalidElement: ElementWrapper) {
        await this.testInputs(input, context, invalidElement);
        await this.testInvalidString(input, context.invalidStringLeftHeavy, context.correctedStringLeftHeavy);
        await this.testInvalidString(input, context.invalidStringRightHeavy, context.correctedStringRightHeavy);
    }

    private async testEmptyDecimalInput(input: ElementWrapper, context: DecimalInputContext) {
        if (context.minValue === 0) {
            await assert.isElementTextEqualTo(input, context.defaultString);
        }
    }

    protected async testEmptyInput(input: ElementWrapper, context: AbstractNumericInputContext, invalidElement: ElementWrapper) {
        await elementHandler.elementSendKeys(input, '');
        await elementHandler.hideKeyboard();

        if (context instanceof DecimalInputContext && !invalidElement) {
            await this.testEmptyDecimalInput(input, context);
        } else {
            await this.testEmptyIntegerInput(input, context as IntegerInputContext, invalidElement);
        }
    }

    private async testEmptyIntegerInput(input: ElementWrapper, context: IntegerInputContext, invalidElement: ElementWrapper) {
        if (context.isRequired) {
            await assert.isDisplayed(invalidElement);
        } else {
            await assert.isNotDisplayed(invalidElement);
        }
    }

    private async testIntegerInputs(input: ElementWrapper, context: IntegerInputContext, invalidElement: ElementWrapper) {
        await this.testInputs(input, context, invalidElement);
        await this.testInvalidString(input, context.invalidStringHighValue, context.correctedStringHighValue);
        await this.testInvalidIntegerStringLow(input, context);
    }

    private async testInvalidIntegerStringLow(input: ElementWrapper, context: IntegerInputContext) {
        await elementHandler.elementSendKeys(input, context.invalidStringLowValue);
        await elementHandler.hideKeyboard();

        if (context.minValue === 0) {
            await assert.isElementTextEqualTo(input, context.correctedStringLowValue)
        } else {
            await assert.isElementTextEqualTo(input, context.invalidStringLowValue)
        }
    }

    private async testInvalidString(input: ElementWrapper, invalidString: string, correctedString: string) {
        await elementHandler.elementSendKeys(input, invalidString);
        await elementHandler.hideKeyboard();

        await assert.isElementTextEqualTo(input, correctedString);
    }

    //endregion

}
