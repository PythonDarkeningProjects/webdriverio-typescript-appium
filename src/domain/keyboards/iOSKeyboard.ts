import { ElementWrapper } from '../elementContainer/elementWrapper';
import { ElementLocator } from '../locators/elementLocators';

class iOSKeyboard {

    // region constructors

    constructor(){
        this.shiftKey = ElementLocator.singleton.getElementByAccessibilityID('shift');
        this.deleteKey = ElementLocator.singleton.getElementByAccessibilityID('delete');
        this.moreKey = ElementLocator.singleton.getElementByAccessibilityID('more');
        this.emojiKey = ElementLocator.singleton.getElementByAccessibilityID('Emoji');
        this.espacioKey = ElementLocator.singleton.getElementByAccessibilityID('espacio');
        this.returnKey = ElementLocator.singleton.getElementByAccessibilityID('Return');
        this.mKey = ElementLocator.singleton.getElementByAccessibilityID('m');
    }

    // endregion

    // region properties
    client: any;

    shiftKey: ElementWrapper;
    deleteKey: ElementWrapper;
    moreKey: ElementWrapper;
    emojiKey: ElementWrapper;
    espacioKey: ElementWrapper;
    returnKey: ElementWrapper;
    mKey: ElementWrapper;

    // endregion
}

// singleton
export default new iOSKeyboard()
