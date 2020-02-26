import Screen from './base.screen';
import { ElementWrapper } from "../elementContainer/elementWrapper";
import { ElementLocator } from '../locators/elementLocators';

class ServerInformationScreen extends Screen {

    // region constructors

    constructor() {
        super();
        this.createScreenshotsFolder();

        // have the client in the test instead of the screen/page
        this.androidErrorLabel = ElementLocator.singleton.getElementByAccessibilityID('server-info-screen-host-input-error-label');
        this.androidHostInput = ElementLocator.singleton.getElementByAccessibilityID('server-info-screen-host-input');
        this.androidPortInput = ElementLocator.singleton.getElementByAccessibilityID('server-info-screen-port-input');
        this.backButton = ElementLocator.singleton.getElementByAccessibilityID('server-info-screen-back-button');
        this.httpRadioButton = ElementLocator.singleton.getElementByAccessibilityID('server-info-screen-scheme-http-button');
        this.httpsRadioButton = ElementLocator.singleton.getElementByAccessibilityID('server-info-screen-https-button');
        this.image = ElementLocator.singleton.getElementByAccessibilityID('server-info-screen-image-main');
        this.iosErrorLabel = ElementLocator.singleton.getElementByXpath('//XCUIElementTypeOther[@name="Host Host  This field is required"]');
        this.iosHostInput = ElementLocator.singleton.getElementByXpath('//XCUIElementTypeOther[@name="Host Host"]');
        this.iosPortInput = ElementLocator.singleton.getElementByXpath('(//XCUIElementTypeOther[@name="Port  (Optional)"])[2]');
        this.nextButton = ElementLocator.singleton.getElementByAccessibilityID('server-info-screen-continue-button');
        this.title = ElementLocator.singleton.getElementByAccessibilityID('server-info-screen-title');

        /* The following BUG: https://timeclockplus.atlassian.net/browse/MC-552 affects to:
         * - iosHostInput
         * - iosPortInput
         * - iosErrorLabel
         */
    }

    // endregion

    // region properties

    androidErrorLabel: ElementWrapper;
    androidHostInput: ElementWrapper;
    androidPortInput: ElementWrapper;
    backButton: ElementWrapper;
    client: any;
    httpRadioButton: ElementWrapper;
    httpsRadioButton: ElementWrapper;
    image: ElementWrapper;
    iosErrorLabel: ElementWrapper;
    iosHostInput: ElementWrapper;
    iosPortInput: ElementWrapper;
    nextButton: ElementWrapper;
    title: ElementWrapper;

    // endregion
}

// singleton
export default new ServerInformationScreen()
