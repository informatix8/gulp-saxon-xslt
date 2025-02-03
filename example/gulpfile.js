'use strict';
const gulp = require('gulp');
const xslt = require('./../');

const lib = 'lib-ref/saxon9he.jar';

const paths = {
  // Basic Example Paths
  basic: {
    src: 'data/catalog/*.xml',
    xsl: 'data/catalog/catalog.xsl',
    dest: 'dist/basic-op/'
  },
  // Import and Params Example Paths
  params: {
    src: 'data/student/*.xml',
    xsl: 'data/student/rule.xsl',
    dest: 'dist/param-op/'
  },
  // DTD Example Paths
  dtd: {
    src: 'data/dtd/*.xml',
    xsl: 'data/dtd/emp.xsl',
    dest: 'dist/dtd-op/'
  },
  // User Requirement Example Paths
  task: {
    src: 'data/actual/*.xml',
    xsl: 'data/actual/master.xsl',
    dest: 'dist/task-op/'
  },
  // Error Example Paths
  error: {
    src: 'data/error/*.xml',
    xsl: 'data/error/master.xsl',
    dest: 'dist/error-op/'
  }
};

/**
 * Basic Example
 */
function basic() {
  return gulp
    .src(paths.basic.src)
    .pipe(
      xslt({
        abortOnError: true,
        jar: lib,
        xsl: paths.basic.xsl,
        debugMode: false
      })
    )
    .on('error', function handleError(err) {
      console.log('Caught Error');
      console.error(err);
    })
    .pipe(gulp.dest(paths.basic.dest));
}

/**
 * Import and Params Example
 */
function params() {
  return gulp
    .src(paths.params.src, { buffer: false })
    .pipe(
      xslt({
        abortOnError: true,
        jar: lib,
        xsl: paths.params.xsl,
        debugMode: false,
        params: {
          lorem: '1 lorem value',
          ipsum: '2 ipsum value'
        }
      })
    )
    .on('error', function handleError(err) {
      console.log('Caught Error');
      console.error(err);
    })
    .pipe(gulp.dest(paths.params.dest));
}

/**
 * Import and Params Example
 */
function dtd() {
  return gulp
    .src(paths.dtd.src, { buffer: false })
    .pipe(
      xslt({
        abortOnError: true,
        jar: lib,
        xsl: paths.dtd.xsl,
        debugMode: false
      })
    )
    .on('error', function handleError(err) {
      console.log('Caught Error');
      console.error(err);
    })
    .pipe(gulp.dest(paths.dtd.dest));
}

/**
 * User Requirement Example
 */
function task() {
  return gulp
    .src(paths.task.src)
    .pipe(
      xslt({
        abortOnError: true,
        jar: lib,
        xsl: paths.task.xsl,
        params: {
          lorem: '1 lorem value',
          ipsum: '2 ipsum value'
        },
        debugMode: false
      })
    )
    .on('error', function handleError(err) {
      console.log('Caught Error');
      console.error(err);
    })
    .pipe(gulp.dest(paths.task.dest));
}

/**
 * Error Example
 */
function error() {
  return gulp
    .src(paths.error.src)
    .pipe(
      xslt({
        abortOnError: false,
        jar: lib,
        xsl: paths.error.xsl,
        params: {
          lorem: '1 lorem value',
          ipsum: '2 ipsum value'
        },
        debugMode: false
      })
    )
    .on('error', function handleError(err) {
      console.log('Caught Error');
      console.error(err);
    })
    .pipe(gulp.dest(paths.error.dest));
}

const watch = function () {
  gulp.watch(paths.basic.src, basic);
  gulp.watch(paths.params.src, params);
  gulp.watch(paths.dtd.src, dtd);
  gulp.watch(paths.task.src, task);
};

const build = gulp.parallel(basic, params, dtd, task);

exports.basic = basic;
exports.params = params;
exports.dtd = dtd;
exports.task = task;
exports.error = error;

exports.watch = watch;
exports.build = build;
exports.default = build;
