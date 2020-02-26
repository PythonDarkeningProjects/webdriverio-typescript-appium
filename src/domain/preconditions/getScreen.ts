import sleepfor = require('sleepfor');
import baseScreen from '../screens/base.screen';
import alerts from '../alerts/alerts';
import welcomeScreen from '../screens/welcome.screen';
import serverInformationScreen from '../screens/server.information.screen';
import selectCompanyScreen from '../screens/select.company.screen';
import pushNotificationsScreen from '../screens/push.notifications.screen';
import pinScreen from '../screens/pin.screen';
import employeeIDScreen from '../screens/employee.id.screen';
import namespaceScreen from '../screens/namespace.screen';
import dashboardScreen from '../screens/dashboard.screen';
import selectJobCodeScreen from '../screens/select.job.code.screen';
import selectCostCodeScreen from '../screens/select.cost.code.screen';
import elementHandler from '../handlers/elementHandler';
import { ElementWrapper } from '../elementContainer/elementWrapper';
import { ElementLocator } from '../locators/elementLocators';
import viewHoursScreen from '../screens/view.hours.screen';
import configurationScreen from '../screens/configuration.screen';
import appInformationScreen from '../screens/settings.information.screen';

export class GetScreen {

	// region properties

	public alert: ElementWrapper;
	public client: any;
	public companyName: string;
	public costCodeName: string;
	public customerIDInput: ElementWrapper;
	public employeeID: string;
	public employeeIDErrorLabel: ElementWrapper;
	public employeeIDInput: ElementWrapper;
	public host: string;
	public hostInput: ElementWrapper;
	public jobCodeName: string;
	public namespace: string;
	public namespaceInput: ElementWrapper;
	public pinScreenInput: ElementWrapper;
	public port: string;
	public portInput: ElementWrapper;
	public profile: string;
	public searchInput: ElementWrapper;
	public selectBreakList: ElementWrapper;
	public selectBreakScreenList: ElementWrapper[];
	public selectCompanyBackButton: ElementWrapper;
	public selectCompanyList: ElementWrapper;
	public selectCompanyScreenList: ElementWrapper[];
	public selectCostCodeList: ElementWrapper;
	public selectCostCodeScreenList: ElementWrapper[];
	public selectJobCodeList: ElementWrapper;
	public selectJobCodeScreenList: ElementWrapper[];
	public serverErrorLabel: ElementWrapper;
	public welcomeErrorLabel: ElementWrapper;
	public welcomeScreenInput: string;

	// end region

	// region helper functions

	private getCompanyName() {
		if (this.companyName === undefined) {
			return baseScreen.defaultCompanyName;
		}

		return this.companyName;
	}

	private getEmployeeID() {
		if (this.employeeID === undefined) {
			return baseScreen.defaultEmployeeID;
		}

		return this.employeeID;
	}

	private getPort() {
		if (this.port === undefined) {
			return '80';
		}

		return this.port;
	}

	private async selectElementFromList(currentList: ElementWrapper[], elementName: string, currentListXPATH: ElementWrapper) {
        /* Click an element from a list
        *
        * Params:
        * - currentList: the list with all the accessibility IDs
        * - elementName: the element on the list to be clicked
        *   (on iOS the names requires an extra space in the last word
        *   e.g: "iTexico Sandbox 1" > "iTexico Sandbox  1")
        * - currentListXPATH: the XPATH of the list
        *
        * Returns:
        * - True when the element name exists
        * - False when the element name does not exists
        */

		if (this.profile.localeCompare('profile:iOS') === 0) {
			// Faster way to check if an element is on the list for iOS
			let isElementNameOnTheList: boolean = false;
			let elementIndex: number;
			let elementsText: string[] = await elementHandler.getElementsTextFromDomUsingXpath(currentListXPATH);

			for (let i: number = 0; i < elementsText.length; i++) {
				if (elementsText[i].includes(elementName)) {
					isElementNameOnTheList = true;
					elementIndex = i;
					break;
				}
			}

			if (!isElementNameOnTheList) { return false; }

			// wrapping again the testID allows to Appium the interaction with it avoiding the issue "stale element reference"
			let elementWrapped = ElementLocator.singleton.getElementByAccessibilityID(currentList[elementIndex].elementSelector);

			while (!await elementHandler.isDisplayed(elementWrapped)) {
				await elementHandler.swipeGestureiOS('up');
			}

			await elementHandler.clickOnElement(elementWrapped);
			return true;
		}
		else {
			let elementWrapped = ElementLocator.singleton.getElementByAccessibilityID(elementName);
			while (!await elementHandler.isDisplayed(elementWrapped)) {
				await elementHandler.swipeGestureAndroid('up', 4, { x: 100, y: 100 });
			}
			await elementHandler.clickOnElement(elementWrapped);
		}
	}
	// endregion

	// region public functions

	public async settingsScreen() {
		// Dashboard Screen (pre-conditions)
		await this.dashboardScreen();
		let windowHeight = await elementHandler.getWindowHeight();
		let windowWidth = await elementHandler.getWindowWidth();
		if (this.profile.localeCompare('profile:iOS') === 0) {
			//TODO:implement swipe gesture to swipe from a specific point on screen
		} else {
			await elementHandler.swipeGestureAndroid('up', 5, { "x": windowWidth / 2, "y": windowHeight - 100 });
		}
		await elementHandler.waitForElementAppears(dashboardScreen.drawerSettings);
		await elementHandler.clickOnElement(dashboardScreen.drawerSettings);
		await elementHandler.waitForElementAppears(configurationScreen.employeeCard);
	}

	public async dashboardScreen() {
		// Employee ID Screen
		await this.employeeIDScreen();
		await elementHandler.elementSendKeys(this.employeeIDInput, this.getEmployeeID());
		await elementHandler.hideKeyboard();
		await elementHandler.clickOnElement(employeeIDScreen.nextButton);
		// Dashboard Screen (pre-conditions)
		await elementHandler.waitForElementAppears(dashboardScreen.employeeName);
		await elementHandler.waitForElementAppears(dashboardScreen.date)
		await elementHandler.waitForElementAppears(dashboardScreen.clockInButton);
		await elementHandler.waitForElementAppears(dashboardScreen.leaveOnBreakButton);
		await elementHandler.waitForElementAppears(dashboardScreen.clockOutButton);
		await elementHandler.waitForElementAppears(dashboardScreen.changeJobCodeButton);
		await elementHandler.waitForElementAppears(dashboardScreen.changeCostCodeButton);
		await elementHandler.waitForElementAppears(dashboardScreen.returnfromBreak);

	}

	public async employeeIDScreen() {
		await this.selectCompanyScreen();

		await elementHandler.waitForElementAppears(pushNotificationsScreen.title);
		await elementHandler.clickOnElement(pushNotificationsScreen.nextButton);
		if (this.profile.localeCompare('profile:iOS') === 0) await elementHandler.acceptAlert();

		await elementHandler.waitForElementAppears(employeeIDScreen.image);
		this.employeeIDInput =
			this.profile.localeCompare('profile:iOS') === 0 ? employeeIDScreen.iosInput : employeeIDScreen.androidInput;
	}

	public async informationScreen() {
		await this.settingsScreen();
		await elementHandler.clickOnElement(configurationScreen.informationButton);
		await elementHandler.waitForElementAppears(appInformationScreen.applicationVersionTitle);
	}

	public async leaveOnBreakScreen(employeeID: string) {
		baseScreen.IDNumberforEmployeeIDScreen = employeeID;
		await this.dashboardScreen();

		await elementHandler.clickOnElement(dashboardScreen.clockOutButton);
		await elementHandler.waitForElementAppears(this.alert);
		await elementHandler.acceptAlert();
		await elementHandler.waitForElementAppears(this.alert);
		await elementHandler.acceptAlert();

		await elementHandler.waitForElementAppears(selectJobCodeScreen.title, 8000);
		this.selectJobCodeList =
			this.profile.localeCompare('profile:iOS') === 0
				? selectJobCodeScreen.iosList
				: selectJobCodeScreen.androidList;
		this.selectJobCodeScreenList = await elementHandler.findElementsFromDomUsingXpath(this.selectJobCodeList);
		await elementHandler.clickOnElement(this.selectJobCodeScreenList[baseScreen.jobCodeListItem]);
		this.alert = this.profile.localeCompare('profile:iOS') === 0 ? alerts.iosAlert : alerts.androidAlert;
	}

	public async namespaceScreen() {
		await this.serverInformationScreen();
		await elementHandler.clickOnElement(serverInformationScreen.httpRadioButton);
		await elementHandler.elementSendKeys(this.hostInput, this.host);
		await elementHandler.elementSendKeys(this.portInput, this.getPort());
		await elementHandler.hideKeyboard();
		await elementHandler.clickOnElement(serverInformationScreen.nextButton);

		await elementHandler.waitForElementAppears(namespaceScreen.title);
		await elementHandler.waitForElementAppears(namespaceScreen.image);
		await elementHandler.waitForElementAppears(namespaceScreen.backButton);
		await elementHandler.waitForElementAppears(namespaceScreen.nextButton);

		this.namespaceInput =
			this.profile.localeCompare('profile:iOS') === 0 ? namespaceScreen.iosInput : namespaceScreen.androidInput;
		await elementHandler.waitForElementAppears(this.namespaceInput);
	}

	public async pinScreen() {
		await this.employeeIDScreen();
		await elementHandler.elementSendKeys(this.employeeIDInput, this.getEmployeeID());
		await elementHandler.hideKeyboard();
		await elementHandler.clickOnElement(employeeIDScreen.nextButton);
		// PIN Screen (pre-conditions)
		await elementHandler.waitForElementAppears(pinScreen.title);
		await elementHandler.waitForElementAppears(pinScreen.image);
		await elementHandler.waitForElementAppears(pinScreen.backButton);
		await elementHandler.waitForElementAppears(pinScreen.nextButton);
		// Setup generic elements
		this.pinScreenInput =
			this.profile.localeCompare('profile:iOS') === 0 ? pinScreen.iosInput : pinScreen.androidInput;
		await elementHandler.waitForElementAppears(this.pinScreenInput);
	}

	public async pushNotificationsScreen() {
		await this.serverInformationScreen();
		await elementHandler.clickOnElement(serverInformationScreen.httpRadioButton);
		await elementHandler.elementSendKeys(this.hostInput, this.host);
		await elementHandler.elementSendKeys(this.portInput, this.getPort());
		await elementHandler.hideKeyboard();
		await elementHandler.clickOnElement(serverInformationScreen.nextButton);

		await elementHandler.waitForElementAppears(namespaceScreen.image);
		this.namespaceInput =
			this.profile.localeCompare('profile:iOS') === 0 ? namespaceScreen.iosInput : namespaceScreen.androidInput;
		await elementHandler.waitForElementAppears(this.namespaceInput);
		await elementHandler.elementSendKeys(this.namespaceInput, this.namespace);
		await elementHandler.hideKeyboard();
		await elementHandler.clickOnElement(namespaceScreen.nextButton);

		await elementHandler.waitForElementAppears(selectCompanyScreen.title);
		await elementHandler.waitForElementAppears(selectCompanyScreen.subTitle);
		await elementHandler.waitForElementAppears(selectCompanyScreen.image);
		await elementHandler.waitForElementAppears(selectCompanyScreen.companyList);

		this.selectCompanyBackButton =
			this.profile.localeCompare('profile:iOS') === 0
				? selectCompanyScreen.iosBackButton
				: selectCompanyScreen.androidBackButton;
		this.selectCompanyList =
			this.profile.localeCompare('profile:iOS') === 0
				? selectCompanyScreen.iosList
				: selectCompanyScreen.androidList;
		this.selectCompanyScreenList = await elementHandler.findElementsFromDomUsingXpath(this.selectCompanyList);
		await elementHandler.waitForElementAppears(this.selectCompanyBackButton);
		await this.selectElementFromList(this.selectCompanyScreenList, this.getCompanyName(), this.selectCompanyList);

		await elementHandler.waitForElementAppears(pushNotificationsScreen.title);
		await elementHandler.waitForElementAppears(pushNotificationsScreen.subTitle);
		await elementHandler.waitForElementAppears(pushNotificationsScreen.backButton);
		await elementHandler.waitForElementAppears(pushNotificationsScreen.nextButton);
	}

	public async selectCompanyScreen() {
		await this.serverInformationScreen();
		await elementHandler.clickOnElement(serverInformationScreen.httpRadioButton);
		await elementHandler.elementSendKeys(this.hostInput, this.host);
		await elementHandler.elementSendKeys(this.portInput, this.getPort());
		await elementHandler.hideKeyboard();
		await elementHandler.clickOnElement(serverInformationScreen.nextButton);

		await elementHandler.waitForElementAppears(namespaceScreen.image);
		this.namespaceInput =
			this.profile.localeCompare('profile:iOS') === 0 ? namespaceScreen.iosInput : namespaceScreen.androidInput;
		await elementHandler.waitForElementAppears(this.namespaceInput);
		await elementHandler.elementSendKeys(this.namespaceInput, this.namespace);
		await elementHandler.hideKeyboard();
		await elementHandler.clickOnElement(namespaceScreen.nextButton);

		// If select company option is available, select company
		await elementHandler.waitForElementAppears(selectCompanyScreen.title);
		await elementHandler.isDisplayed(selectCompanyScreen.title) && await this.isSelectCompanyScreenDisplayed();
	}

	public async selectCostCodeScreen() {
		await this.selectJobCodeScreen();

		if (this.profile.localeCompare('profile:iOS') === 0) {
			await this.selectElementFromList(this.selectJobCodeScreenList, this.jobCodeName, this.selectJobCodeList);
		}
		else {
			await elementHandler.clickOnElement(this.selectJobCodeScreenList[baseScreen.jobCodeListItem]);
		}

		await elementHandler.waitForElementAppears(selectCostCodeScreen.title, 2000);
		await elementHandler.waitForElementAppears(selectCostCodeScreen.pagingBackIcon);
		await elementHandler.waitForElementAppears(selectCostCodeScreen.pagePrefix);
		await elementHandler.waitForElementAppears(selectCostCodeScreen.pagingPicker);
		await elementHandler.waitForElementAppears(selectCostCodeScreen.pagingSuffix);
		await elementHandler.waitForElementAppears(selectCostCodeScreen.pagingNextIcon);
		await elementHandler.waitForElementAppears(selectCostCodeScreen.costCodeList);
		await elementHandler.waitForElementAppears(selectCostCodeScreen.backButton);

		this.selectCostCodeList =
			this.profile.localeCompare('profile:iOS') === 0
				? selectCostCodeScreen.iosList
				: selectCostCodeScreen.androidList;
		this.selectCostCodeScreenList = await elementHandler.findElementsFromDomUsingXpath(this.selectCostCodeList);
		await elementHandler.waitForElementAppears(this.selectCostCodeList);
		this.searchInput = this.profile.localeCompare('profile:iOS') === 0 ? selectCostCodeScreen.iosSearchInput : selectCostCodeScreen.androidSearchInput;
	}

	public async selectJobCodeScreen(acceptAlertTimes?: number) {
		/**
		 * params:
		 * - acceptAlertTimes (optional): times to be click on the alert
		 */

		await this.dashboardScreen();
		await elementHandler.clickOnElement(dashboardScreen.clockInButton);
		await elementHandler.waitForElementAppears(this.alert);
		await elementHandler.acceptAlert(acceptAlertTimes);

		await elementHandler.waitForElementAppears(selectJobCodeScreen.title, 2000);
		await elementHandler.waitForElementAppears(selectJobCodeScreen.pagingBackIcon);
		await elementHandler.waitForElementAppears(selectJobCodeScreen.pagePrefix);
		await elementHandler.waitForElementAppears(selectJobCodeScreen.pagingPicker);
		await elementHandler.waitForElementAppears(selectJobCodeScreen.pagingSuffix);
		await elementHandler.waitForElementAppears(selectJobCodeScreen.pagingNextIcon);
		await elementHandler.waitForElementAppears(selectJobCodeScreen.jobCodeList);
		await elementHandler.waitForElementAppears(selectJobCodeScreen.backButton);

		this.selectJobCodeList =
			this.profile.localeCompare('profile:iOS') === 0
				? selectJobCodeScreen.iosList
				: selectJobCodeScreen.androidList;
		this.selectJobCodeScreenList = await elementHandler.findElementsFromDomUsingXpath(this.selectJobCodeList);
		await elementHandler.waitForElementAppears(this.selectJobCodeList);
		this.searchInput = this.profile.localeCompare('profile:iOS') === 0 ? selectJobCodeScreen.iosSearchInput : selectJobCodeScreen.androidSearchInput;
	}

	public async selectNextPaginationIconJobCodeScreen() {
		await this.selectJobCodeScreen();
		await elementHandler.clickOnElement(selectJobCodeScreen.pagingNextIcon);
		await elementHandler.waitForElementAppears(this.selectJobCodeList);
		this.selectJobCodeScreenList = await elementHandler.findElementsFromDomUsingXpath(this.selectJobCodeList);
	}

	public async serverInformationScreen() {
		await elementHandler.waitForElementAppears(welcomeScreen.homeImage);
		await elementHandler.clickOnElement(welcomeScreen.manualSetupButton);

		await elementHandler.waitForElementAppears(serverInformationScreen.title);
		await elementHandler.waitForElementAppears(serverInformationScreen.image);
		await elementHandler.waitForElementAppears(serverInformationScreen.httpRadioButton);
		await elementHandler.waitForElementAppears(serverInformationScreen.httpsRadioButton);
		await elementHandler.waitForElementAppears(serverInformationScreen.backButton);
		await elementHandler.waitForElementAppears(serverInformationScreen.nextButton);

		this.hostInput =
			this.profile.localeCompare('profile:iOS') === 0
				? serverInformationScreen.iosHostInput
				: serverInformationScreen.androidHostInput;
		this.portInput =
			this.profile.localeCompare('profile:iOS') === 0
				? serverInformationScreen.iosPortInput
				: serverInformationScreen.androidPortInput;
		this.alert = this.profile.localeCompare('profile:iOS') === 0 ? alerts.iosAlert : alerts.androidAlert;
		this.serverErrorLabel = this.profile.localeCompare('profile:iOS') === 0 ? serverInformationScreen.iosErrorLabel : serverInformationScreen.androidErrorLabel;
		await elementHandler.waitForElementAppears(this.hostInput);
		await elementHandler.waitForElementAppears(this.portInput);
	}

	public async viewHoursScreen() {
		// Dashboard Screen (pre-condition)
		await this.dashboardScreen();

		// Go to view hours screen
		await elementHandler.waitForElementAppears(dashboardScreen.drawerHours);
		await elementHandler.clickOnElement(dashboardScreen.drawerHours);
		await elementHandler.waitForElementAppears(viewHoursScreen.backButton);
	}


	public async welcomeScreen() {
		// Welcome Screen (pre-conditions)
		await elementHandler.waitForElementAppears(welcomeScreen.title);
		await elementHandler.waitForElementAppears(welcomeScreen.homeImage);
		await elementHandler.waitForElementAppears(welcomeScreen.logo);
		await elementHandler.waitForElementAppears(welcomeScreen.manualSetupButton);
		await elementHandler.waitForElementAppears(welcomeScreen.nextButton);
		// Setup generic elements
		this.customerIDInput = this.profile.localeCompare('profile:iOS') === 0 ? welcomeScreen.iosCustomerIDInput : welcomeScreen.androidCustomerIDInput;
		this.alert = this.profile.localeCompare('profile:iOS') === 0 ? alerts.iosAlert : alerts.androidAlert;
		this.welcomeErrorLabel = this.profile.localeCompare('profile:iOS') === 0 ? welcomeScreen.iosErrorLabel : welcomeScreen.androidErrorLabel;
		await elementHandler.waitForElementAppears(this.customerIDInput);
	}

	public async isSelectCompanyScreenDisplayed() {
		await elementHandler.waitForElementAppears(selectCompanyScreen.title, 1000);
		await elementHandler.waitForElementAppears(selectCompanyScreen.subTitle);
		await elementHandler.waitForElementAppears(selectCompanyScreen.image);
		await elementHandler.waitForElementAppears(selectCompanyScreen.companyList);

		this.selectCompanyBackButton =
			this.profile.localeCompare('profile:iOS') === 0
				? selectCompanyScreen.iosBackButton
				: selectCompanyScreen.androidBackButton;
		this.selectCompanyList =
			this.profile.localeCompare('profile:iOS') === 0
				? selectCompanyScreen.iosList
				: selectCompanyScreen.androidList;
		this.selectCompanyScreenList = await elementHandler.findElementsFromDomUsingXpath(this.selectCompanyList);
		await elementHandler.waitForElementAppears(this.selectCompanyBackButton);
		await this.selectElementFromList(this.selectCompanyScreenList, this.getCompanyName(), this.selectCompanyList);
	}

	// end region

}

// singleton
export default new GetScreen();