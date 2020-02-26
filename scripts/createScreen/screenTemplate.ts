import Screen from './base.screen';
import { ElementWrapper } from "../elementContainer/elementWrapper";
import { ElementLocator } from '../locators/elementLocators';

class GeneratedScreenName extends Screen {

    // region Constructors

    constructor() {
        super();
        this.createScreenshotsFolder();

        this.exampleElement = ElementLocator.singleton.getElementByAccessibilityID('example-accessibility-id');
    }

    // endregion

    // region Properties

    exampleElement: ElementWrapper;

    // endregion
}

// singleton
export default new GeneratedScreenName();