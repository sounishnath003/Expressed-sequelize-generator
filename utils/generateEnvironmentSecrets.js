const crypto = require('crypto');
const fs = require('fs');
const path = require('path')
const chalk = require('chalk');

function generateKeys(length) {
    return crypto.randomBytes(length).toString('hex');
}

async function generateEnvironmentSecrets(rootDirectory) {
    return new Promise(((resolve, reject) => {
        try {
            const JWT_ACCESS_TOKEN_SECRET = generateKeys(64);
            const JWT_REFRESH_TOKEN_SECRET = generateKeys(64);

            // write to .env file
            const ENV_FILE_PATH = path.join(rootDirectory, '.env');

            const payload1 = `JWT_ACCESS_TOKEN_SECRET=${JWT_ACCESS_TOKEN_SECRET}\n`;
            const payload2 = `JWT_REFRESH_TOKEN_SECRET=${JWT_REFRESH_TOKEN_SECRET}\n`;

            fs.appendFile(ENV_FILE_PATH, payload1, (err) => {
                if (err) throw err;
            })

            fs.appendFile(ENV_FILE_PATH, payload2, (err) => {
                if (err) throw err;
            })

            console.table([JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET]);

            console.log(chalk.green.bold(`Environment Secrets for JWT Auth and Refresh tokens created!`));

            resolve(true);
        } catch (e) {
            reject(e)
        }
    }))

}


module.exports = generateEnvironmentSecrets;
