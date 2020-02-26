import { Constants } from '../constants/constants';
import { AbstractInputContext } from './abstractInputContext';

export class StringInputContext extends AbstractInputContext {

    //region Constructors

    constructor(mustBeUppercase: boolean, allowsAlpha: boolean, allowsNumber: boolean, allowsSpecial: boolean, isRequired: boolean, maxLength: number, stringDefault: string) {
        super(allowsAlpha, allowsNumber, allowsSpecial, isRequired);

        this.maxLength = maxLength;

        this.mustBeUppercase = mustBeUppercase;

        this.stringDefault = stringDefault;

        this.initializeTestStrings();
    }

    //endregion

    //endregion

    //region Properties

    public combinationAlphaPart: string;
    public combinationNumericPart: string;
    public combinationSpecialPart: string;

    public maxLength: number;
    public mustBeUppercase: boolean;

    public stringDefault: string;
    public stringFullCombinational: string;
    public stringValidCombinational: string;

    //endregion

    //region Helper Methods

    private addNeededCharsToMatchMaxLength(stringToModify: string): string {
        let modifiedString = stringToModify;
        if (modifiedString.length < this.maxLength) {
            let additionalChar = this.getValidAdditionalCharacter();
            let charsNeeded = this.maxLength - modifiedString.length;
            for (let i = 1; i <= charsNeeded; i++) {
                modifiedString += additionalChar;
            }
        }

        return modifiedString;
    }

    private createValidCombinationString(): string {
        let combinationString = '';
        if (this.allowsAlpha) {
            combinationString += this.combinationAlphaPart;
        }

        if (this.allowsNumeric) {
            combinationString += this.combinationNumericPart;
        }

        if (this.allowsSpecial) {
            combinationString += this.combinationSpecialPart;
        }

        return this.addNeededCharsToMatchMaxLength(combinationString);
    }

    private getUpperOrLowerCaseCharacter(): string {
        if (this.mustBeUppercase) {
            return 'A';
        }
        else {
            return 'a';
        }
    }

    private getValidAdditionalCharacter(): string {
        if (this.allowsAlpha) {
            return this.getUpperOrLowerCaseCharacter();
        } else if (this.allowsSpecial) {
            return '%';
        } else if (this.allowsNumeric) {
            return '4';
        } else {
            throw new Error(this.CONTEXT_NOT_CORRECTLY_CONFIGURED_NO_CHAR_ALLOWED);
        }
    }

    private initializeAlphaString(): void {
        let alpha = Constants.fiveHundredAndOneAlphaCharacters.substring(0, this.maxLength);

        if (this.mustBeUppercase) {
            alpha = alpha.toUpperCase();
        }

        this.stringAlpha = alpha;
    }

    private initializeCombinationStrings(): void {
        // guard clause - not long enough
        if (this.maxLength  < 3) {
            this.stringValidCombinational = this.addNeededCharsToMatchMaxLength('');
        }

        this.combinationAlphaPart = Constants.fiveHundredAndOneAlphaCharacters.substring(0, this.maxLength / 3);
        if (this.mustBeUppercase) {
            this.combinationAlphaPart = this.combinationAlphaPart.toUpperCase();
        }

        this.combinationNumericPart = Constants.fiveHundredAndOneNumberCharacters.substring(0, this.maxLength / 3);
        this.combinationSpecialPart = Constants.fiveHundredAndOneSpecialCharacters.substring(0, this.maxLength / 3);
        this.stringFullCombinational = this.combinationAlphaPart + this.combinationNumericPart + this.combinationSpecialPart;
        this.stringValidCombinational = this.createValidCombinationString();
    }

    private initializeNumberString(): void {
        let numbers = Constants.fiveHundredAndOneNumberCharacters.substring(0, this.maxLength);

        if (this.mustBeUppercase) {
            numbers = numbers.toUpperCase();
        }

        this.stringNumeric = numbers;
    }

    private initializeSpecialString(): void {
        let special = Constants.fiveHundredAndOneSpecialCharacters.substring(0, this.maxLength);

        if (this.mustBeUppercase) {
            special = special.toUpperCase();
        }

        this.stringSpecial = special;
    }

    private initializeTestStrings(): void {
        this.initializeAlphaString();
        this.initializeNumberString();
        this.initializeSpecialString();
        this.initializeCombinationStrings();
    }

    //endregion

}
