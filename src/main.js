import logSymbols from "log-symbols";
import chalk from "chalk";
import * as path from "path";
import figlet from 'figlet';
import boxen from "boxen";
import * as fs from 'fs';
import ora from "ora";
import {spawn} from 'child_process';
import * as fse from 'fs-extra';
// utils
const log = console.log;
const startTime = new Date().getTime();

const modulesToBeInstalled = ['install', 'express', 'sequelize', 'cors', 'morgan', 'sqlite3', 'typescript', 'ts-node', 'dotenv', 'express-fileupload'];
const moduleTypesDeclarations = ['install', '@types/express', '@types/sequelize', '@types/cors', '@types/morgan', '@types/node', '@types/express-fileupload' , 'nodemon', '-D'];

// Getting arguments from user CLI
function getArgs() {
    const argvs = process.argv.slice(2)
    if (argvs.length === 0) {
        log(logSymbols.error, chalk.red.underline.bold(`No valid arguments were passed!`));
        log(chalk.blue.bold(`Quick start...`));
        {
            console.group();
            log(chalk.green(`expressed .`));
            log('OR');
            log(chalk.green(`expressed my-node-api`));
            log(`installs in "my-node-api" directory (${path.join(process.cwd(), 'my-node-api')})`)
            console.groupEnd();
        }

        return null;
    }
    return argvs;
}

// Build Profile Info!!
async function buildProfileInfoBanner() {
    return await figlet('Expressed', {font: 'Big'}, (err, data) => {
        if (err) {
            log('Something went bad!');
            console.error(err);
            return;
        }
        log(chalk.blue.bold(data));
        const githubLink = 'https://github.com/sounishnath003';
        const linkedInLink = 'https://www.linkedin.com/in/sounish-nath-897b30186/';
        const youtube = `${chalk.white('🙈 Github @')} ${chalk.red(githubLink)}`;
        const social = `${chalk.white('💰 LinkedIn @')} ${chalk.blue(linkedInLink)}`;
        const header = `${youtube}\n${social}`;
        console.log(
            boxen(header, {
                borderColor: 'red',
                borderStyle: 'double',
                align: 'center',
            })
        )
    });
}

// Create / Check If Project Folder Exists!
async function createOrCheckIfFolderExists(rootDirectory) {
    try {
        const exists = await fs.existsSync(rootDirectory)
        if (!exists)
            return fs.mkdir(rootDirectory, (err, data) => {
                if (err)
                    log(chalk.red.bold(`${rootDirectory} cannot be created!`))
                log(chalk.green.bold(`${rootDirectory} has been created successfully!`))
            })
        else
            log(chalk.green.bold.underline(`${rootDirectory} is already created!`))

    } catch (error) {
        console.error({error});
    }
}


async function done(arg) {
    console.log(chalk.yellow('\n------------------------------------'));
    console.log('Begin by typing:');
    console.group();
    console.log(chalk.blue('cd'), arg);
    console.log(chalk.blue('yarn dev'));
    console.group();
    console.log('starts the development server (using nodemon 🐱‍🏍🔥)');
    console.groupEnd();
    console.log(chalk.blue('yarn start'));
    console.group();
    console.log(`starts the server (using node 🎉)`);
    console.groupEnd();
    console.groupEnd();
    console.log(chalk.yellow('------------------------------------'));

    const endTime = new Date().getTime();
    const timeDifference = (endTime - startTime) / 1000;
    console.log(`✅ Done in ${timeDifference} seconds ✨`);
    console.log('🌈 Happy hacking 🦄');
}

async function waitForChilProcessToCompleteAndFeedBackToParent(childProcess, spinner, reject, resolve) {
    // childProcess.stdout.on('data', (chunk) => log(chunk.toJSON()) );
    childProcess.stdout.pipe(process.stdout);
    childProcess.on('exit', (code, signal) => {
        if (code) {
            spinner.fail();
            reject(log(`Process execution terminated with ${code}`));
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
        const childProcess = spawn(command, argumentsPassed, {cwd: rootDirectory, detached: false, shell: 'cmd'})
        waitForChilProcessToCompleteAndFeedBackToParent(childProcess, spinner, reject, resolve);
    });
    return true;
}

async function generateCustomTemplateSnippets(projectName) {
    return new Promise(((resolve, reject) => {
        const spinner = ora({
            spinner: 'balloon',
            text: 'Mixins up some magical spells.... Pouring files into jar',
            color: 'yellow'
        }).start();

        try {
            /*
                * Template folder e ja ache -> soja tene rootdirectory te dukiye debo!
                * Happy Snippets
             */
            const sourceDirectory = path.join(process.cwd(), 'templates');
            const destinationDirectory = path.join(projectName);

            fse.copySync(sourceDirectory, destinationDirectory, {overwrite: 'true'}, (err) => {
                if (err) throw new Error();
            })
            spinner.succeed();
            resolve(true);
        } catch (e) {
            spinner.fail();
            reject(e);
        }
    }))
}

async function modifyPackageJson(rootDirectory) {
    return await new Promise((async (resolve, reject) => {
        const spinner = ora({color: 'red', text: 'Modifying package.json file...'}).start();
        try {
            const filePath = path.join(rootDirectory, 'package.json');

            fs.readFile(filePath, {encoding: 'utf-8'}, ((err, data) => {
                if (err) throw new Error();

                data = JSON.parse(data);
                let updatedPackageJsonData = {
                    ...data,
                    name: rootDirectory.trim().toLowerCase().replace(' ', '-')
                }
                updatedPackageJsonData = JSON.stringify(updatedPackageJsonData, null, 2);

                fs.writeFile(filePath, updatedPackageJsonData, (err) => {
                    if (err) throw new Error('Cannot update Package.json file...')

                    spinner.succeed();
                    resolve(true);
                })
            }))

        } catch (e) {
            reject(e);
            spinner.fail();
        }
    }))
}

// Script for creating workflow
async function boostrapWorkflow(rootDirectory) {
    await createOrCheckIfFolderExists(rootDirectory);
    await fs.readdir(rootDirectory, (err, data) => {
        if (!err) {
            const files = data;
            if (files.length > 0) return console.log(
                logSymbols.error,
                `Path ${chalk.green(rootDirectory)} not empty, ${chalk.red('aborting')}`
            );
        }
    });

    log('🐱‍🏍 Bootstrapping Express app in', chalk.green(rootDirectory), '\n');
    await (async function () {
        await scriptInstallerInBatch(rootDirectory, 'npm',
            ['init', '-y'], `Creating Package.json file...`);
    })()
}

async function startInstallingModules(rootDirectory, whatToBeInstalled) {
    return new Promise((async (resolve, reject) => {
        const spinner = ora({
            color: 'green', text: "Please wait few seconds... " +
                "while installing required modules"
        }).start();
        try {
            const chilProcess = spawn('npm', whatToBeInstalled, {shell: true, cwd: rootDirectory});
            await waitForChilProcessToCompleteAndFeedBackToParent(chilProcess, spinner, reject, resolve);
        } catch (e) {
            spinner.fail();
            reject(e);
        }
    }))
}

export async function main() {
    await buildProfileInfoBanner();
    const argsPassed = getArgs();
    const rootDirectory = path.join(process.cwd(), argsPassed[0]);
    await (async function () {
        await boostrapWorkflow(rootDirectory);
        await generateCustomTemplateSnippets(argsPassed[0]);
        await modifyPackageJson(argsPassed[0]);
        await scriptInstallerInBatch(rootDirectory, 'npm', modulesToBeInstalled,
            'Installing dev dependencies for bootstrapping ...');
        await scriptInstallerInBatch(rootDirectory, 'npm', moduleTypesDeclarations,
            'Updating Type definitions for modules ...');
        await scriptInstallerInBatch(rootDirectory, 'npx', ['tsc', '--init'],
            'Generating TypeScript.json file ...');
        await scriptInstallerInBatch(rootDirectory, 'npm', ['upgrade'],
            'Upgrading dependencies peer...');
        await done(argsPassed[0])
    })()
}


// -----------------------------------------------------------------------
// *********************************************************
// -----------------------------------------------------------------------
