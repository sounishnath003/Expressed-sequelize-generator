const path = require('path');
const chalk = require('chalk');

const log = console.log;

// Getting arguments from user CLI
function getArgs() {
    const args = process.argv.slice(2)
    if (args.length === 0) {
        log('💀 ⚡', chalk.red.underline.bold(`No valid arguments were passed!`));
        log(chalk.blue.bold(`Quick start...`));
        {
            console.group();
            log(chalk.green(`expressed-gen .`));
            log('OR');
            log(chalk.green(`expressed-gen my-node-api`));
            log(`installs in "my-node-api" directory (${path.join(process.cwd(), 'my-node-api')})`)
            console.groupEnd();
        }
        return null;
    }
    return args;
}

module.exports = {getArgs};
