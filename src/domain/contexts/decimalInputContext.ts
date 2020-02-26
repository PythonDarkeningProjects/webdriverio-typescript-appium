import { AbstractNumericInputContext } from './abstractNumericInputContext';
import { Constants } from '../constants/constants';

export class DecimalInputContext extends AbstractNumericInputContext {

    //region Constants

    private readonly numberOfValidValuesToTest = 10;

    //endregion

    //region Constructors

    constructor(isRequired: boolean, minValue: number, maxValue: number, maxCharactersAfterDecimal: number, maxCharactersBeforeDecimal: number) {
        super(isRequired, maxValue, minValue);

        this.defaultString = this.createZeroString(maxCharactersAfterDecimal);

        this.maxCharactersAfterDecimal = maxCharactersAfterDecimal;
        this.maxCharactersBeforeDecimal = maxCharactersBeforeDecimal;
        this.maxLength = maxCharactersBeforeDecimal + maxCharactersAfterDecimal;

        this.initialize();
    }

    //endregion

    //region Properties

    public correctedStringLeftHeavy: string;
    public correctedStringRightHeavy: string;

    public defaultString: string;

    public invalidStringLeftHeavy: string;
    public invalidStringRightHeavy: string;

    private maxCharactersAfterDecimal: number;
    private maxCharactersBeforeDecimal: number;
    private maxLength: number;

    //endregion

    //region Overridden Methods

    protected calculateIncrement(): void {
        let difference = this.maxValue - this.minValue;

        if (difference <= 10) {
            this.increment = parseFloat((difference / 10).toPrecision(1));
        }
        else {
            this.increment = Math.floor(this.maxValue / 11);
        }
    }

    protected calculateNumberOfTestStringsNeeded(): void {
        this.numberOfTestStringsNeeded = this.numberOfValidValuesToTest;
    }

    protected generateCorrectedStrings(): void {
        this.correctedStringLeftHeavy = this.createCorrectedStringLeftHeavy();
        this.correctedStringRightHeavy = this.createCorrectedStringRightHeavy();
    }

    protected generateInvalidInputs(): void {
        this.invalidStringLeftHeavy = this.createInvalidStringLeftHeavy();
        this.invalidStringRightHeavy = this.createInvalidStringRightHeavy();
    }

    protected generateValidInputs(): void {
        this.arrValidStrings = [];

        for (let stringCreationOrderNumber = 1; stringCreationOrderNumber <= this.numberOfTestStringsNeeded; stringCreationOrderNumber++) {
            this.addZeroStringIfNeeded(stringCreationOrderNumber);
            this.addMiddleValueStringIfNeeded(stringCreationOrderNumber);
            this.addMaxValueStringifNeeded(stringCreationOrderNumber);
        }
    }

    //endregion

    //region Helper Methods

    private createCorrectedStringLeftHeavy() {
        let baseString = Constants.fiveHundredAndOneNumberCharacters.slice(0, this.maxCharactersBeforeDecimal) + '.' + Constants.fiveHundredAndOneNumberCharacters[this.maxCharactersBeforeDecimal];
        let numberOfZeros = this.maxLength - baseString.length + 1;

        for (let index = 0; index < numberOfZeros; index++) {
            baseString += '0';
        }

        return baseString;
    }

    private createCorrectedStringRightHeavy(): string {
        return '1.' + Constants.fiveHundredAndOneNumberCharacters.slice(0, this.maxCharactersAfterDecimal);
    }

    private createInvalidStringLeftHeavy(): string {
        return Constants.fiveHundredAndOneNumberCharacters.slice(0, this.maxCharactersBeforeDecimal + 1);
    }

    private createInvalidStringRightHeavy(): string {
        return '1.' + Constants.fiveHundredAndOneNumberCharacters.slice(0, this.maxCharactersAfterDecimal + 1);
    }

    private createValidRightNumberString(maxNumberOfCharacters: number, numberOfStringsCreated: number): string {
        let validString = Constants.fiveHundredAndOneNumberCharacters.slice(numberOfStringsCreated, maxNumberOfCharacters + numberOfStringsCreated);
        return validString;
    }

    private createZeroString(maxNumberOfCharacterAfterDecimal: number): string {
        let zeroString = '0.';
        for (let index = 0; index < maxNumberOfCharacterAfterDecimal; index++) {
            zeroString += '0';
        }

        return zeroString;
    }

    private addZeroStringIfNeeded(ordinalNumberOfStringBeingPushed: number): void {
        if (ordinalNumberOfStringBeingPushed === 1) {
            this.arrValidStrings.push(this.createZeroString(this.maxCharactersAfterDecimal));
        }
    }

    private addMaxValueStringifNeeded(ordinalNumberOfStringBeingPushed: number) {
        if (ordinalNumberOfStringBeingPushed === this.numberOfTestStringsNeeded) {
            this.arrValidStrings.push(this.createMaxValueString());
        }
    }

    private addMiddleValueStringIfNeeded(ordinalNumberOfStringBeingPushed: number) {
        if (ordinalNumberOfStringBeingPushed > 1 && ordinalNumberOfStringBeingPushed < this.numberOfTestStringsNeeded) {
            let validString = Math.round(this.minValue) + this.increment * ordinalNumberOfStringBeingPushed + '.' + this.createValidRightNumberString(this.maxCharactersAfterDecimal, ordinalNumberOfStringBeingPushed);
            this.arrValidStrings.push(validString);
        }
    }

    private createMaxValueString() {
        let maxValueString = this.maxValue.toString();
        if (this.maxValue === Math.floor(this.maxValue)) {
            maxValueString += '.';
            for (let index = 0; index < this.maxCharactersAfterDecimal; index++) {
                maxValueString += '0';
            }
        }
        return maxValueString;
    }

    //endregion

}
