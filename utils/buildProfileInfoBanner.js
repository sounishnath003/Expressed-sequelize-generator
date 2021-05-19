const figlet = require('figlet');
const chalk = require('chalk');
const boxen = require('boxen');

const log = console.log;

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
                borderColor: 'yellow',
                borderStyle: 'double',
                align: 'center',
            })
        )
    });
}


module.exports = {buildProfileInfoBanner}
