'use strict';

const exec = require('child_process').exec;
const merge  = require('lodash.merge');
const loggerFn = require('./utils/logger');

/**
 * Saxon Utility to be run using Java
 *
 * @param {String} inputFile
 * @param {String} options
 * @param {Function} cb
 */
function saxon(inputFile, optionsParams, cb) {

  let options = {
    timeout: 5000,
    params: {},
    basePath: '',
    outputPath: '',
    debugMode: false
  };

  merge(options, optionsParams);

  const logger = loggerFn(options.debugMode);
  //logger.info('Saxon function init with options ', { inputFile, options });

  let opts = [
    '-jar ' + options.jarPath,
    '-s:' + inputFile,
    '-xsl:' + options.xslPath,
    '-o:' + options.outputPath,
  ];

  const dataParamsArr = Object.keys(options.params).map(function(key) {
    return `${key}="${options.params[key]}"`;
  });

  opts = opts.concat(dataParamsArr);

  //logger.info('Data Params', dataParamsArr);

  const javaCommand = 'java ' + opts.join(' ');
  //logger.info('Java Command', javaCommand);

  const cmd = exec(javaCommand, { timeout: options.timeout }, function(err, stdout, stderr) {
    if(err) {
      logger.error('Unexpected Error running Java Command');
      return cb(err);
    }

    if(stderr) {
      logger.error('Console Error running Java Command');
      return cb(stderr);
    }

    //logger.info('Console Output', stdout);

  });

  cmd.on('exit', function(code) {
    //logger.info('Java `Command Exiting...');
    if(code === 0) { // Return this callback only if no Error
        return cb();
    }

  });
}

module.exports = saxon;
