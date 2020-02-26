import assert from '../../domain/handlers/assertionHandler';
import client from '../../domain/utils/client';
import { Constants } from '../../domain/constants/constants';
import generalSettings from '../../domain/utils/generalSettings';
import hookHandler from '../../domain/handlers/hookHandler';
import navigationHandler from '../../domain/handlers/navigationHandler';
import selectCostCodeScreen from '../../domain/screens/select.cost.code.screen';

client.profile = process.argv.slice(5)[0];
navigationHandler.host = generalSettings.host;
navigationHandler.namespace = Constants.namespaces.clockOperations;
navigationHandler.companyName = 'Select Cost Code  8';
navigationHandler.employeeID = '1';
navigationHandler.jobCodeName = 'Basic Job Code';

describe('scc Screen', function () {

  this.ctx.wdio = client.getInstance();

  before('Before All', async function () {
    await DatabaseFacade.restoreDatabase(Constants.databaseNames.clockOperations);
    await hookHandler.setupWdioClient();
    hookHandler.wdioClient = this.wdio.client;
  });

  beforeEach('Before Each', async function () {
    await hookHandler.reloadApp();
    await navigationHandler.selectCostCodeScreen();
  });

  afterEach('After Each', async function () {
    await hookHandler.takeScreenshotOnTestFailure(this.currentTest);
  });

  after('After All', async function () {
    await hookHandler.teardown();
  });

  describe('Initial Page Presentation', function () {

    it('initial page presentation', async function () {
      await assert.isDisplayed(selectCostCodeScreen.title);
      await assert.isDisplayed(selectCostCodeScreen.pagingBackIcon);
      await assert.isDisplayed(selectCostCodeScreen.pagePrefix);
      await assert.isDisplayed(selectCostCodeScreen.pagingPicker);
      await assert.isDisplayed(selectCostCodeScreen.pagingSuffix);
      await assert.isDisplayed(selectCostCodeScreen.pagingNextIcon);
      await assert.isDisplayed(selectCostCodeScreen.costCodeList);
      await assert.isDisplayed(selectCostCodeScreen.backButton);
    });

  });

});