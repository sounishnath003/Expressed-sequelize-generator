const {getArgs} = require('./getArgs');
const {buildProfileInfoBanner} = require('./buildProfileInfoBanner')
const {whenDone} = require('./whenDone');

const {scriptInstallerInBatch, waitForChildProcessToCompleteAndFeedBackToParent} = require('./scriptInstallerInBatch')
const {generateCustomTemplateSnippets} = require('./generateCustomTemplateSnippets')
const {modifyPackageJson} = require('./modifyPackageJson')
const {boostrapWorkflow,} = require('./bootstapWorkflow')
const {startInstallingModules} = require('./startInstallingModules')
const generateEnvironmentSecrets = require('./generateEnvironmentSecrets');

const modulesToBeInstalled = ['install', 'express', 'sequelize', 'cors', 'morgan', 'sqlite3',
    'typescript', 'ts-node', 'dotenv', 'express-fileupload', 'http-errors', 'cookie-parser'];

const moduleTypesDeclarations = ['install', '@types/express', '@types/sequelize', '@types/cors', '@types/morgan', '@types/node',
    '@types/express-fileupload', 'nodemon', '@types/http-errors', '@types/uuid', '@types/cookie-parser', '-D'];


module.exports = {
    getArgs,
    buildProfileInfoBanner,
    whenDone,
    waitForChildProcessToCompleteAndFeedBackToParent,
    scriptInstallerInBatch,
    generateCustomTemplateSnippets,
    modifyPackageJson,
    boostrapWorkflow,
    generateEnvironmentSecrets,
    startInstallingModules,
    modulesToBeInstalled,
    moduleTypesDeclarations
}
