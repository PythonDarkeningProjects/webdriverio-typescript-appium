import shell = require('shelljs');

afterEach('take screenshot on failure', async function(){
    if (this.currentTest.state !== 'passed') {
      shell.mkdir('-p', `./screenshots/${this.currentTest.parent.title}`);
      await this.wdio.client.saveScreenshot(`./screenshots/${this.currentTest.parent.title}/${this.currentTest.title}.png`);
    }
});