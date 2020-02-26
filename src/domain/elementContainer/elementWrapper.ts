/** Appium
* 
* strategies: [http://appium.io/docs/en/commands/element/find-elements/index.html#selector-strategies]
*
**/

export class ElementWrapper {

    // region Constructors

    constructor(strategy: string, elementSelector: string, name: string) {
        this.strategy = strategy;
        this.elementSelector = elementSelector;
        this.name = name;
    }

    // endregion

    // region Properties

    public strategy: string;
    public elementSelector: string;
    public name: string;

    // endregion

}