const {spawn, exec} = require('child_process');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const figlet = require('figlet');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');


async function waitForChildProcessToCompleteAndFeedBackToParent(childProcess, spinner, reject, resolve) {
    // childProcess.stdout.on('data', (chunk) => log(chunk.toJSON()) );
    childProcess.stdout.pipe(process.stdout);
    childProcess.on('exit', (code, signal) => {
        if (code) {
            spinner.fail();
            reject(console.log(`Process execution terminated with ${code}`));
        } else if (signal) {
            spinner.fail();
            reject(log(`Process execution terminated with signal: ${signal}`));
        } else {
            spinner.succeed();
            resolve(true);
        }
    })
}


// Creating Package.json File || Installed Script with Spawning up a child Thread
async function scriptInstallerInBatch(rootDirectory, command, argumentsPassed, comments) {
    return new Promise((resolve, reject) => {
        const spinner = ora({color: "cyan", text: comments, spinner: "dots"}).start();
        // Info:
        // The child_process module provides the ability to spawn
        // subprocesses in a manner that is similar,
        // Link: https://nodejs.org/api/child_process.html
        const childProcess = spawn(command, argumentsPassed, {cwd: rootDirectory, shell: true, stdio: "pipe"})
        waitForChildProcessToCompleteAndFeedBackToParent(childProcess, spinner, reject, resolve);
    });
    return true;
}

module.exports = {scriptInstallerInBatch, waitForChildProcessToCompleteAndFeedBackToParent};
