'use strict';

import merge from 'lodash.merge';
import path from 'path';
import PluginError from 'plugin-error';
import through2 from 'through2';
import temporary from 'temporary';
import { rimrafSync } from 'rimraf';

// User defined
import saxon from './saxon.js';
import globToVinyl from './globToVinyl.js';
import loggerFn from './utils/logger.js';

const PLUGIN_NAME = 'gulp-saxon-xslt';
const DEBUG_MODE_FALSE = false;

/**
 * Primary function to run the transformation
 *
 * @param {Object} options
 */

function transformer(optionParams) {
  var options = {
    abortOnError: true,
    debugMode: DEBUG_MODE_FALSE,
    params: {},
    execOptions: {}
  };

  merge(options, optionParams);

  const logger = loggerFn(options.debugMode);

  const tmpDir = new temporary.Dir();

  function transform(file, e, next) {
    const self = this;

    logger.info('File Input Path ', file.path);

    const filePath = file.path;
    const basePath = file.dirname;
    const outputDir = tmpDir.path;
    const outputPath = outputDir + '/' + path.basename(file.path);

    var jarPath = options.jar;
    var xslPath = options.xsl;

    if (!path.isAbsolute(jarPath)) {
      jarPath = path.join(process.cwd(), '/', options.jar);
    }

    if (!path.isAbsolute(xslPath)) {
      xslPath = path.join(process.cwd(), '/', options.xsl);
    }

    logger.info('Output Directory ', outputPath);

    const saxonOptions = {
      execOptions: options.execOptions,
      params: options.params,
      abortOnError: options.abortOnError,
      basePath,
      outputPath,
      debugMode: options.debugMode,
      jarPath: jarPath,
      xslPath: xslPath
    };

    logger.info('Saxon Options', saxonOptions);

    saxon(filePath, saxonOptions, function (saxonErr) {
      if (saxonErr) {
        var error = new PluginError(PLUGIN_NAME, saxonErr);
        logger.error('Error with the Saxon process', saxonErr);
        self.emit('error', error);
        if (options.abortOnError === true) {
          //self.emit('end', error);
          process.exit(1);
        }

        return next();
      }

      globToVinyl(path.join(outputDir, '**/*.*'), function (err, files) {
        if (err) {
          var error = new PluginError(PLUGIN_NAME, err);
          logger.error('Error from Vinyl Stream Glob, ', err);
          self.emit('error', error);
          if (options.abortOnError === true) {
            //self.emit('end', error);
            process.exit(1);
          }
          return next();
        }

        files.forEach(function (vFile) {
          self.push(vFile);
        });

        logger.info('Pushed output files to vinyl stream');
        //files.forEach(function (file) {
        //    logger.info(file.path);
        //})

        rimrafSync(tmpDir.path);

        logger.info('Deleted the tmp output Path', tmpDir.path);
        return next();
      });
    });
  }

  return through2.obj(transform);
}

export default transformer;
