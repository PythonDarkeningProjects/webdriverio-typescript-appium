import { ElementWrapper } from '../elementContainer/elementWrapper';
import { ElementLocator } from '../locators/elementLocators';

class Alerts {
    
    // region constructors

    constructor(){
        this.iosAlert = ElementLocator.singleton.getElementByClass('XCUIElementTypeAlert');
        this.androidAlert = ElementLocator.singleton.getElementByID('android:id/parentPanel');
    }

    // endregion


    // region properties

    iosAlert: ElementWrapper;
    androidAlert: ElementWrapper;

    // endregion
}

// singleton
export default new Alerts()