const {spawn} = require('child_process');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const figlet = require('figlet');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');


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
            const sourceDirectory = path.join(__dirname, '..', 'templates');
            const destinationDirectory = path.join(projectName);
            fse.copySync(sourceDirectory, destinationDirectory, {overwrite: true}, (err) => {
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


module.exports = {generateCustomTemplateSnippets};
