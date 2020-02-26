afterEach('reset the app to a know state', async function () {
    await this.wdio.client.closeApp();
    await this.wdio.client.launchApp();
});