import { AbstractNumericInputContext } from './abstractNumericInputContext';

export class IntegerInputContext extends AbstractNumericInputContext {

    //region Constructors

    constructor(isRequired: boolean, maxValue: number, minValue: number) {
        super(isRequired, maxValue, minValue);

        this.initialize();
    }

    //endregion

    //region Properties

    public correctedStringHighValue: string;
    public correctedStringLowValue: string;

    public invalidStringHighValue: string;
    public invalidStringLowValue: string;

    //endregion

    //region Overridden Methods

    protected calculateIncrement(): void {
        if (this.numberOfTestStringsNeeded < 10) {
            this.increment = 1;
            return;
        }

        let difference = this.maxValue - this.minValue;
        this.increment = Math.floor(difference / 10);
    }

    protected calculateNumberOfTestStringsNeeded(): void {
        let difference = this.maxValue - this.minValue;

        if (difference < 10) {
            this.numberOfTestStringsNeeded = difference;
            return;
        }

        this.numberOfTestStringsNeeded = 10;
    }

    protected generateCorrectedStrings() {
        this.generateCorrectedHighValueString();
        this.generateCorrectedLowValueString();
    }

    protected generateInvalidInputs(): void {
        this.invalidStringHighValue = (this.maxValue + 1).toString();
        this.invalidStringLowValue = (this.minValue - 1).toString();
    }

    protected generateValidInputs(): void {
        this.arrValidStrings = [];

        for (let numberOfStringsCreated = 0; numberOfStringsCreated < this.numberOfTestStringsNeeded; numberOfStringsCreated++) {
            if (numberOfStringsCreated === 0) {
                this.arrValidStrings.push(this.minValue.toString());
                continue;
            }

            if (numberOfStringsCreated === 9) {
                this.arrValidStrings.push(this.maxValue.toString());
                continue;
            }

            let validString = Math.round(this.minValue) + this.increment * numberOfStringsCreated;
            this.arrValidStrings.push(validString.toString());
        }
    }

    //endregion

    //region Helper Methods

    private generateCorrectedHighValueString() {
        let invalidString = this.invalidStringHighValue;
        this.correctedStringHighValue = invalidString.slice(0, invalidString.length - 1);
    }

    private generateCorrectedLowValueString() {
        if (this.minValue === 0) {
            this.correctedStringLowValue = '1';
            return;
        }

        this.correctedStringLowValue = this.minValue.toString();
    }

    //endregion

}
