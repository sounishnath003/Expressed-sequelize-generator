#!/usr/bin/env node
const path = require('path');
const utils = require('../utils');

// measuring total time takes to generate
const startTime = new Date().getTime();

async function npmInstallRequiredModules(rootDirectory) {
    await utils.scriptInstallerInBatch(rootDirectory, 'npm', utils.modulesToBeInstalled,
        'Installing dev dependencies for bootstrapping ...');
    await utils.scriptInstallerInBatch(rootDirectory, 'npm', utils.moduleTypesDeclarations,
        'Updating Type definitions for modules ...');
    await utils.scriptInstallerInBatch(rootDirectory, 'npx', ['tsc', '--init'],
        'Generating TypeScript.json file ...');
    await utils.scriptInstallerInBatch(rootDirectory, 'npm', ['upgrade'],
        'Upgrading dependencies peer...');
}

async function main() {
    await utils.buildProfileInfoBanner();
    const argsPassed = utils.getArgs();
    const rootDirectory = path.join(process.cwd(), argsPassed[0]);
    await (async function () {
        await utils.boostrapWorkflow(rootDirectory);
        await utils.generateCustomTemplateSnippets(argsPassed[0]);
        await utils.modifyPackageJson(argsPassed[0]);
        await npmInstallRequiredModules(rootDirectory);
        await utils.whenDone(startTime, argsPassed[0])
    })()
}


// -----------------------------------------------------------------------
// *********************************************************
// -----------------------------------------------------------------------


module.exports.main = main;
