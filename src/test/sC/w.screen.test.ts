import assert from '../../domain/handlers/assertionHandler';
import client from '../../domain/utils/client';
import { Constants } from '../../domain/constants/constants';
import DatabaseFacade from '../../domain/facades/DatabaseFacade';
import elementHandler from '../../domain/handlers/elementHandler'
import hookHandler from '../../domain/handlers/hookHandler';
import navigationHandler from '../../domain/handlers/navigationHandler';
import serverInformationScreen from '../../domain/screens/server.information.screen';
import { StringInputTester } from "../../domain/testers/stringInputTester";
import welcomeScreen from '../../domain/screens/welcome.screen'

client.profile = process.argv.slice(5)[0];
const sleepfor = require('sleepfor');

describe('w Screen', function () {

    this.ctx.wdio = client.getInstance();
    let stringInputTester = new StringInputTester();

    before('Before all', async function () {
        await DatabaseFacade.restoreDatabase(Constants.databaseNames.serverConfiguration);
        await hookHandler.setupWdioClient();
        hookHandler.wdioClient = this.wdio.client;
    });

    beforeEach('Before each', async function () {
        await hookHandler.reloadApp();
        await navigationHandler.welcomeScreen();
    });

    afterEach('After each', async function () {
        await hookHandler.takeScreenshotOnTestFailure(this.currentTest);
    });

    after('After all', async function () {
        await hookHandler.teardown();
    });

    describe('Initial Page Presentation', function () {

        it('initial page presentation', async function () {
            await assert.isDisplayed(welcomeScreen.logo);
            await assert.isDisplayed(welcomeScreen.homeImage);
            await assert.isDisplayed(welcomeScreen.title);
            await assert.isDisplayed(navigationHandler.customerIDInput);
            await assert.isDisplayed(welcomeScreen.manualSetupButton);
            await assert.isDisplayed(welcomeScreen.nextButton);

            await assert.isEnabled(navigationHandler.customerIDInput);
            await assert.isEnabled(welcomeScreen.manualSetupButton);
            await assert.isEnabled(welcomeScreen.nextButton);
        });

    });

    describe('Basic Actions Validation', function () {

        it('should test customer id input field', async function () {
            await stringInputTester.testStringInput(navigationHandler.customerIDInput, true, false, true, true, true, 40, navigationHandler.employeeIDErrorLabel);
        });

        it('alert notification on invalid customer id', async function () {
            // pre-conditions
            await assert.isDisplayed(welcomeScreen.homeImage);

            // exercise
            await elementHandler.elementSendKeys(navigationHandler.customerIDInput, 'invalidCustomerID');
            await elementHandler.hideKeyboard();
            await elementHandler.clickOnElement(welcomeScreen.nextButton);
            await elementHandler.waitForElementAppears(navigationHandler.alert);

            // post-conditions
            await assert.isDisplayed(navigationHandler.alert);
        });

        it('return to the welcome screen from the server information screen', async function () {
            // pre-conditions
            await assert.isDisplayed(welcomeScreen.homeImage);

            // exercise
            await elementHandler.clickOnElement(welcomeScreen.manualSetupButton);
            await elementHandler.waitForElementAppears(serverInformationScreen.title);
            await elementHandler.clickOnElement(serverInformationScreen.backButton);

            // post-conditions
            sleepfor(500);
            await assert.isDisplayed(welcomeScreen.homeImage);
        });

    });

});
