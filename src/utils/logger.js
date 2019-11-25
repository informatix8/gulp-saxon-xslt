'use strict';

const { Console } = require('console');

/**
 * Simple function to get the current date time
 * @returns Datetime is in YYYY-MM-DD HH:mm:ss format
 */
function getCurrentDateTime() {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return `${date} ${time}`;
}

/**
 * Basic console.log/warn/etc. wrapper to optionally print the logs
 * @param {Boolean} isDebug - Flag to either enable/disable the logging
 * @param {Object} classInstance - Object instance to help print the class name
 */
const logger = function(isDebug) {

  const debug = {};

  const consoleLogger = new Console({ stdout: process.stdout, stderr: process.stderr });

  if (isDebug) {
    for (let m in console) {
      if (typeof console[m] === 'function') {
        debug[m] = console[m].bind(consoleLogger, m.toUpperCase() + ' => ' + getCurrentDateTime() + ' => ');
      }
    }
  } else {
    for (let m in console) {
      if (typeof console[m] === 'function') {
        debug[m] = function() {};
      }
    }
  }

  return debug;

};

module.exports = logger;
