import assert from '../../domain/handlers/assertionHandler';
import client from '../../domain/utils/client';
import { Constants } from '../../domain/constants/constants';
import dashboardScreen from '../../domain/screens/dashboard.screen';
import DatabaseFacade from '../../domain/facades/DatabaseFacade';
import generalSettings from '../../domain/utils/generalSettings';
import hookHandler from '../../domain/handlers/hookHandler';
import navigationHandler from '../../domain/handlers/navigationHandler';

client.profile = process.argv.slice(5)[0];

describe('d Screen', function () {


  this.ctx.wdio = client.getInstance();

  before('Setup', async function () {
    await DatabaseFacade.restoreDatabase(Constants.databaseNames.dashboard);
    await hookHandler.setupWdioClient();
    hookHandler.wdioClient = this.wdio.client;
  });

  beforeEach('Reload App - Navigate to Employee ID', async function () {
    await hookHandler.reloadApp();
    await navigationHandler.dashboardScreen();
  });

  afterEach('Take screenshot on failure', async function () {
    await hookHandler.takeScreenshotOnTestFailure(this.currentTest);
  });

  after('Teardown', async function () {
    await hookHandler.teardown();
  });

  describe('Initial Page Presentation', function () {

    it('initial page presentation', async function () {
      await assert.isDisplayed(dashboardScreen.employeeName);
      await assert.isDisplayed(dashboardScreen.date);
      await assert.isDisplayed(dashboardScreen.clockInButton);
      await assert.isDisplayed(dashboardScreen.leaveOnBreakButton);
      await assert.isDisplayed(dashboardScreen.clockOutButton);
      await assert.isDisplayed(dashboardScreen.changeJobCodeButton);
      await assert.isDisplayed(dashboardScreen.changeCostCodeButton);
      await assert.isDisplayed(dashboardScreen.drawerDashboard);
      await assert.isDisplayed(dashboardScreen.drawerMessages);
      await assert.isDisplayed(dashboardScreen.drawerHours);
      await assert.isDisplayed(dashboardScreen.drawerLastPunch);

      await assert.isEnabled(dashboardScreen.employeeName);
      await assert.isEnabled(dashboardScreen.date);
      await assert.isEnabled(dashboardScreen.clockInButton);
      await assert.isEnabled(dashboardScreen.leaveOnBreakButton);
      await assert.isEnabled(dashboardScreen.clockOutButton);
      await assert.isEnabled(dashboardScreen.changeJobCodeButton);
      await assert.isEnabled(dashboardScreen.changeCostCodeButton);
      await assert.isEnabled(dashboardScreen.drawerDashboard);
      await assert.isEnabled(dashboardScreen.drawerMessages);
      await assert.isEnabled(dashboardScreen.drawerHours);
      await assert.isEnabled(dashboardScreen.drawerLastPunch);
    });

  });

});