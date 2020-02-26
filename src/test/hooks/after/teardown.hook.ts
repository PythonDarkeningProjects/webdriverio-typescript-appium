import baseScreen from '../../../domain/screens/base.screen';

after('teardown', async function(){
    await this.wdio.client.terminateApp(baseScreen.packageName);
    await this.wdio.client.removeApp(baseScreen.packageName);
});