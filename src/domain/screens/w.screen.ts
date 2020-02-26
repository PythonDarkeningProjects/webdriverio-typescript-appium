import Screen from './base.screen';
import { ElementWrapper } from "../elementContainer/elementWrapper";
import { ElementLocator } from '../locators/elementLocators';

export class WelcomeScreen extends Screen {

    // region constructors

    constructor() {
        super();
        this.createScreenshotsFolder();

        // have the client in the test instead of the screen/page
        this.androidCustomerIDInput = ElementLocator.singleton.getElementByAccessibilityID('welcome-screen-customer-id-input');
        this.androidErrorLabel = ElementLocator.singleton.getElementByAccessibilityID('welcome-screen-customer-id-input-error-label');
        this.customerIDErrorLabel = ElementLocator.singleton.getElementByAccessibilityID('errorLabel');
        this.homeImage = ElementLocator.singleton.getElementByAccessibilityID('welcome-screen-image-main');
        this.iosCustomerIDInput = ElementLocator.singleton.getElementByAccessibilityID('Customer ID Customer ID');
        this.iosErrorLabel = ElementLocator.singleton.getElementByXpath('//XCUIElementTypeOther[@name="Customer ID Customer ID  This field is required"]');
        this.logo = ElementLocator.singleton.getElementByAccessibilityID('welcome-screen-image-logo');
        this.manualSetupButton = ElementLocator.singleton.getElementByAccessibilityID('welcome-screen-link-server');
        this.nextButton = ElementLocator.singleton.getElementByAccessibilityID('welcome-screen-continue-button');
        this.title = ElementLocator.singleton.getElementByAccessibilityID('welcome-screen-title');

        /* The following BUG: https://timeclockplus.atlassian.net/browse/MC-552 affects to:
         * - iosErrorLabel
         * - iosCustomerIDInput
         */

    }

    // endregion

    // region properties

    androidCustomerIDInput: ElementWrapper;
    androidErrorLabel: ElementWrapper;
    customerIDErrorLabel: ElementWrapper;
    homeImage: ElementWrapper;
    iosCustomerIDInput: ElementWrapper;
    iosErrorLabel: ElementWrapper;
    logo: ElementWrapper;
    manualSetupButton: ElementWrapper;
    nextButton: ElementWrapper;
    title: ElementWrapper;

    // endregion
}

// singleton
export default new WelcomeScreen()