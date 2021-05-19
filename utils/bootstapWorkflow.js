const {spawn} = require('child_process');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const figlet = require('figlet');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');
const {scriptInstallerInBatch} = require("./scriptInstallerInBatch");

// Create / Check If Project Folder Exists!
async function createOrCheckIfFolderExists(rootDirectory) {
    try {
        const exists = await fs.existsSync(rootDirectory)
        if (!exists)
            return fs.mkdir(rootDirectory, (err, data) => {
                if (err)
                    console.log(chalk.red.bold(`${rootDirectory} cannot be created!`))
                console.log(chalk.green.bold(`${rootDirectory} has been created successfully!`))
            })
        else
            console.log(chalk.green.bold.underline(`${rootDirectory} is already created!`))

    } catch (error) {
        console.dir(error);

    }
}

// Script for creating workflow
async function boostrapWorkflow(rootDirectory) {
    await createOrCheckIfFolderExists(rootDirectory);
    await fs.readdir(rootDirectory, (err, data) => {
        if (!err) {
            const files = data;
            if (files.length > 0) return console.log(
                '💀 ⚡',
                `Path ${chalk.green(rootDirectory)} not empty, ${chalk.red('aborting')}`
            );
        }
    });

    console.log('🐱‍🏍 Bootstrapping Express app in', chalk.green(rootDirectory), '\n');
    await (async function () {
        await scriptInstallerInBatch(rootDirectory, 'npm',
            ['init', '-y'], `Creating Package.json file...`);
    })()
}

module.exports = {boostrapWorkflow}
