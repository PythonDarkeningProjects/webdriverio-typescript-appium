export abstract class AbstractInputContext {

    //region Constants

    protected readonly CONTEXT_NOT_CORRECTLY_CONFIGURED_NO_CHAR_ALLOWED = 'Input context has been set to allow no characters at all... make sure you configured your input context correctly.';

    //endregion

    //region Constructors

    constructor(allowsAlpha: boolean, allowsNumeric: boolean, allowsSpecial: boolean, isRequired: boolean) {
        this.allowsAlpha = allowsAlpha;
        this.allowsNumeric = allowsNumeric;
        this.allowsSpecial = allowsSpecial;
        this.isRequired = isRequired;

        this.stringAlpha = 'abcd';
        this.stringNumeric = '1234';
        this.stringSpecial = '@#$%';
    }

    //endregion

    //region Properties

    public allowsAlpha: boolean;
    public allowsNumeric: boolean;
    public allowsSpecial: boolean;
    public isRequired: boolean;

    public stringAlpha: string;
    public stringNumeric: string;
    public stringSpecial: string;

    //endregion

}
