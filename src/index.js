'use strict';

const merge = require('lodash.merge');
const path = require('path');
const PluginError = require('plugin-error');
const through2 = require('through2');
const temporary = require('temporary');
const rimraf = require('rimraf');


// User defined
const saxon = require('./saxon');
const globToVinyl = require('./globToVinyl');
const loggerFn = require('./utils/logger');

const PLUGIN_NAME = 'gulp-saxon-xslt';
const DEFAULT_TIMEOUT = 5000;
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
        timeout: DEFAULT_TIMEOUT,
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

        if(!path.isAbsolute(jarPath)) {
            jarPath = path.join(process.cwd(), '/', options.jar);
        }

        if(!path.isAbsolute(xslPath)) {
             xslPath = path.join(process.cwd(), '/', options.xsl);
        }

        logger.info('Output Directory ', outputPath);

        const saxonOptions = {
            timeout: options.timeout,
            params: options.params,
            abortOnError: options.abortOnError,
            basePath,
            outputPath,
            debugMode: options.debugMode,
            jarPath: jarPath,
            xslPath: xslPath
        };

        logger.info('Saxon Options', saxonOptions);

        saxon(filePath, saxonOptions, function(saxonErr) {
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

            globToVinyl(path.join(outputDir, '**/*.*'), function(err, files) {
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

                files.forEach(function(vFile) {
                    self.push(vFile);
                });

                logger.info('Pushed output files to vinyl stream');
                //files.forEach(function (file) {
                //    logger.info(file.path);
                //})

                rimraf.sync(tmpDir.path);

                logger.info('Deleted the tmp output Path', tmpDir.path);
                return next();

            });

        });
    }

    return through2.obj(transform);
}

module.exports = transformer;
