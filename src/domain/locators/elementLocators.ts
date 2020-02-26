import { ElementWrapper } from "../elementContainer/elementWrapper";

export class ElementLocator {
    public static singleton = new ElementLocator();

    // region constructors

    constructor() {
        // do nothing
    }

    // endregion

    // region public methods

    public getElementByAccessibilityID(accessibilityID: string) {
        return new ElementWrapper('accessibility id', accessibilityID, `by accessibility id: ${accessibilityID}`);
    }

    public getElementByXpath(xpath: string) {
        return new ElementWrapper('xpath', xpath, `by xpath: ${xpath}`);
    }

    public getElementByID(id: string){
        return new ElementWrapper('id', id, `by id: ${id}`);
    }

    public getElementByClass(className: string){
        return new ElementWrapper('class name', className, `by class name: ${className}`);
    }

    // endregion
}