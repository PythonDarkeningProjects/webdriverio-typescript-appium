import { AbstractInputContext } from './abstractInputContext';

export abstract class AbstractNumericInputContext extends AbstractInputContext {

    //region Constructors

    constructor(isRequired: boolean, maxValue: number, minValue: number) {
        super(false, true, false, isRequired);

        this.maxValue = maxValue;
        this.minValue = minValue;
    }

    //endregion

    //region Properties

    public arrValidStrings: string[];

    public increment: number;

    public maxValue: number;
    public minValue: number;

    public numberOfTestStringsNeeded: number;

    //endregion

    //region Protected Methods

    protected initialize() {
        //order matters
        this.calculateNumberOfTestStringsNeeded();
        this.calculateIncrement();

        this.generateValidInputs();
        this.generateInvalidInputs();
        this.generateCorrectedStrings();
    }

    //endregion

    //region Abstract Methods

    protected abstract calculateIncrement(): void;

    protected abstract calculateNumberOfTestStringsNeeded(): void;

    protected abstract generateCorrectedStrings(): void;

    protected abstract generateInvalidInputs(): void;

    protected abstract generateValidInputs(): void;

    //endregion

}
