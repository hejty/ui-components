const argv = require('yargs').argv;
const path = require('path');
const config = {};

config.projectSrcPath = path.resolve(__dirname, '..');
config.isProductionBuild = argv['production-build'] ? true : false;
config.componentsPath =  path.resolve(config.projectSrcPath, 'components');
config.cssDistRelativePath =  '../../dist/css';
config.jsDistRelativePath =  '../../dist/js';

module.exports = config;
