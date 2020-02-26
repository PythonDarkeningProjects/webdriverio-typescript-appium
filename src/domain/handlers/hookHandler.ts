import client from '../utils/client';
import baseScreen from '../screens/base.screen';
import * as shell from 'shelljs';

export class HookHandler {

    // region properties

    public wdioClient;

    // endregion

    // region public methods

    public async setupWdioClient() {
        await client.getInstance().setPropagation();
    }

    public async teardown() {
        await this.wdioClient.terminateApp(baseScreen.packageName);
        await this.wdioClient.removeApp(baseScreen.packageName);
    }

    public async takeScreenshotOnTestFailure(currentTest) {
        if (currentTest.state !== 'passed') {
            shell.mkdir('-p', `./screenshots/${currentTest.parent.title}`);
            await this.wdioClient.saveScreenshot(`./screenshots/${currentTest.parent.title}/${currentTest.title}.png`);
        }
    }

    public async reloadApp() {
        await this.wdioClient.closeApp();
        await this.wdioClient.launchApp();
    }

    // endregion

}

export default new HookHandler();