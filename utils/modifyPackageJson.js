const {spawn} = require('child_process');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const figlet = require('figlet');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');


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


module.exports = {modifyPackageJson};
