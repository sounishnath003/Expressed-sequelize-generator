const chalk = require('chalk');


async function whenDone(startTime, arg) {
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


module.exports = {whenDone}
