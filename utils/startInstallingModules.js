const {waitForChildProcessToCompleteAndFeedBackToParent} = require('./scriptInstallerInBatch')

const {spawn} = require('child_process');
const ora = require('ora');


async function startInstallingModules(rootDirectory, whatToBeInstalled) {
    return new Promise((async (resolve, reject) => {
        const spinner = ora({
            color: 'green', text: "Please wait few seconds... " +
                "while installing required modules"
        }).start();
        try {
            const childProcess = spawn('npm', whatToBeInstalled, {shell: true, cwd: rootDirectory});
            await waitForChildProcessToCompleteAndFeedBackToParent(childProcess, spinner, reject, resolve);
        } catch (e) {
            spinner.fail();
            reject(e);
        }
    }))
}


module.exports = {startInstallingModules};
