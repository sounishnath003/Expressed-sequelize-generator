import logSymbols from "log-symbols";
import chalk from "chalk";
import * as path from "path";
import figlet from 'figlet';
import boxen from "boxen";
import * as fs from 'fs';
import ora from "ora";
import {spawn} from 'child_process';

// utils
const log = console.log;
const startTime = new Date().getTime();

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
    console.log(chalk.blue('npm run dev'));
    console.group();
    console.log('starts the development server (using nodemon 🧐)');
    console.groupEnd();
    console.log(chalk.blue('npm start'));
    console.group();
    console.log(`starts the server (using node 😁)`);
    console.groupEnd();
    console.groupEnd();
    console.log(chalk.yellow('------------------------------------'));

    const endTime = new Date().getTime();
    const timeDifference = (endTime - startTime) / 1000;
    console.log(`✅ Done in ${timeDifference} seconds ✨`);
    console.log('🌈 Happy hacking 🦄');
}

// Creating Package.json File || Installed Script with Spawning up a child Thread
async function scriptInstallerInBatch(rootDirectory, command, argumentsPassed, comments) {
    return new Promise((resolve, reject) => {
        const spinner = ora({color: "cyan", text: comments, spinner: "dots"}).start();
        // Info:
        // The child_process module provides the ability to spawn
        // subprocesses in a manner that is similar,
        // Link: https://nodejs.org/api/child_process.html
        const childProcess = spawn(command, argumentsPassed, {cwd: rootDirectory, shell: true})
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
    });
    return true;
}

async function generateCustomTemplateSnippets(rootDirectory) {
    return new Promise(((resolve, reject) => {
        const spinner = ora({
            spinner: 'balloon',
            text: 'Mixins up some magical spells.... Pouring files into jar',
            color: 'yellow'
        });

        try{
        /*
            * Template folder e ja ache -> soja tene rootdirectory te dukiye debo!
            * Happy Snippets
         */



        }catch (e) {
            spinner.fail();
            reject(e);
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
    await scriptInstallerInBatch(rootDirectory, 'npm',
        ['init', '-y'], `Creating Package.json file...`);

    await generateCustomTemplateSnippets(rootDirectory)
}

export async function main() {
    await buildProfileInfoBanner();
    const argsPassed = getArgs();
    const rootDirectory = path.join(process.cwd(), argsPassed[0]);
    await (async function () {
        await boostrapWorkflow(rootDirectory);
    })()
    await done(argsPassed[0]);
}


// -----------------------------------------------------------------------
// *********************************************************
// -----------------------------------------------------------------------
