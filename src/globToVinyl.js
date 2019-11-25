'use strict';

const vfs = require('vinyl-fs');

/**
 * Convert a blog pattern to Vinyl files
 *
 * @param {String} path - Glob pattern for the files
 * @param {Function} callback
 */
function globToVinyl(path, callback) {

    const files = [];
    const globber = vfs.src(path);

    globber.once('error', callback);

    globber.on('data', function(file) {
        files.push(file); // Push one file at a time in the array
    });

    globber.once('end', function() {
        callback(null, files); // return the array when all files loaded.
    });
}

module.exports = globToVinyl;
