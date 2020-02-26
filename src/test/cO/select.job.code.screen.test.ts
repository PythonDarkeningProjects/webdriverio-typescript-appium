import assert from '../../domain/handlers/assertionHandler';
import client from '../../domain/utils/client';
import { Constants } from '../../domain/constants/constants';
import DatabaseFacade from '../../domain/facades/DatabaseFacade';
import elementHandler from '../../domain/handlers/elementHandler';
import generalSettings from '../../domain/utils/generalSettings';
import hookHandler from '../../domain/handlers/hookHandler';
import navigationHandler from '../../domain/handlers/navigationHandler';
import selectJobCodeScreen from '../../domain/screens/select.job.code.screen';

client.profile = process.argv.slice(5)[0];
const sleepfor = require('sleepfor');

describe('sjc Screen', function () {

  this.ctx.wdio = client.getInstance();
  navigationHandler.companyName = 'Select Job Code  9';
  navigationHandler.namespace = Constants.namespaces.clockOperations;
  navigationHandler.host = generalSettings.host;

  before('Before All', async function () {
    await DatabaseFacade.restoreDatabase(Constants.databaseNames.clockOperations);
    await hookHandler.setupWdioClient();
    hookHandler.wdioClient = this.wdio.client;
  });

  beforeEach('Before Each', async function () {
    await hookHandler.reloadApp();
  });

  afterEach('After Each', async function () {
    await hookHandler.takeScreenshotOnTestFailure(this.currentTest);
  });

  after('After All', async function () {
    await hookHandler.teardown();
  });

  describe('Initial Page Presentation', function () {

    it('initial page presentation', async function () {
      // setup 
      navigationHandler.employeeID = '1';
      await navigationHandler.selectJobCodeScreen();

      //exercise
      await assert.isDisplayed(selectJobCodeScreen.title);
      await assert.isDisplayed(selectJobCodeScreen.pagingBackIcon);
      await assert.isDisplayed(selectJobCodeScreen.pagePrefix);
      await assert.isDisplayed(selectJobCodeScreen.pagingPicker);
      await assert.isDisplayed(selectJobCodeScreen.pagingSuffix);
      await assert.isDisplayed(selectJobCodeScreen.pagingNextIcon);
      await assert.isDisplayed(selectJobCodeScreen.jobCodeList);
      await assert.isDisplayed(selectJobCodeScreen.backButton);
    });

  });

  // describe('Validate Back Button', function () {

  //   it('Back button on header returns to dashboard', async function () {
  //     // setup
  //     getScreen.employeeID = '2';
  //     getScreen.selectJobCodeScreen();

  //     // pre-condition
  //     await assert.isDisplayed(selectJobCodeScreen.title);

  //     // exercise
  //     await elementHandler.waitForElementAppears(selectJobCodeScreen.jobCodeList);
  //     await elementHandler.clickOnElement(getScreen.selectJobCodeScreenList[baseScreen.jobCodeListItem]);
  //     await elementHandler.clickOnElement(selectCostCodeScreen.backButton);
  //     await elementHandler.waitForElementAppears(dashboardScreen.employeeName);

  //     // post-condition
  //     await assert.isDisplayed(dashboardScreen.employeeName);
  //   });

  // });

  describe('Validate pagination', function () {

    it('Select Job Code Screen - pagination', async function () {
      // setup
      navigationHandler.employeeID = '3';
      await navigationHandler.selectJobCodeScreen();

      // pre-condition
      await assert.isDisplayed(selectJobCodeScreen.title);

      //exercise
      await elementHandler.waitForElementAppears(selectJobCodeScreen.jobCodeList);
      await elementHandler.clickOnElement(selectJobCodeScreen.pagingNextIcon);
      await elementHandler.waitForElementAppears(selectJobCodeScreen.jobCodeList);

      //post-conditions
      await assert.isDisplayed(selectJobCodeScreen.title);
      await assert.isDisplayed(selectJobCodeScreen.pagingBackIcon);
      await assert.isDisplayed(selectJobCodeScreen.pagePrefix);
      await assert.isDisplayed(selectJobCodeScreen.pagingPicker);
      await assert.isDisplayed(selectJobCodeScreen.pagingSuffix);
      await assert.isDisplayed(selectJobCodeScreen.pagingNextIcon);
      await assert.isDisplayed(selectJobCodeScreen.jobCodeList);
      await assert.isDisplayed(selectJobCodeScreen.backButton);
    });

    it('sjc Screen - search', async function () {
      // setup
      navigationHandler.employeeID = '4';
      await navigationHandler.selectJobCodeScreen();

      // pre-condition
      await assert.isDisplayed(selectJobCodeScreen.title);

      //exercise
      await elementHandler.waitForElementAppears(selectJobCodeScreen.jobCodeList)
      await elementHandler.elementSendKeys(navigationHandler.searchInput, 'abdfkdjfhbjskdfbjwsebfwhjkbfjhwsbfjqwhvbs faskmjhednbakj');
      sleepfor(5000);
      await elementHandler.waitForElementAppears(selectJobCodeScreen.jobCodeListEmpty)

      //post-conditions
      await assert.isDisplayed(selectJobCodeScreen.jobCodeListEmpty);
    });

  });

});