'use strict';
const gulp = require('gulp');
const xslt = require('./../');

const lib = 'lib-ref/saxon9he.jar';

gulp.task('xslt-basic', function() {

  return gulp.src([ // Basic Example
    'data/catalog/*.xml',
  ]).pipe(xslt({
    abortOnError: true,
    jar: lib,
    xsl: 'data/catalog/catalog.xsl',
    debugMode: false,
  })).on('error', function handleError (err) {
    console.log('Caught Error');
    console.error(err);
  }).pipe(gulp.dest('dist/basic-op/'));
});

gulp.task('xslt-params', function () {

  return gulp.src([ // Import and Params Example
    'data/student/*.xml',
  ], { buffer: false}).pipe(xslt({
    abortOnError: true,
    jar: lib,
    xsl: 'data/student/rule.xsl',
    debugMode: false,
    params: {
      lorem: '1 lorem value',
      ipsum: '2 ipsum value'
    },
  })).on('error', function handleError (err) {
    console.log('Caught Error');
    console.error(err);
  }).pipe(gulp.dest('dist/param-op/'));

});

gulp.task('xslt-dtd', function () {

  return  gulp.src([ // DTD Example
    'data/dtd/*.xml',
  ], { buffer: false }).pipe(xslt({
    abortOnError: true,
    jar: lib,
    xsl: 'data/dtd/emp.xsl',
    debugMode: false
  })).on('error', function handleError (err) {
    console.log('Caught Error');
    console.error(err);
  }).pipe(gulp.dest('dist/dtd-op/'));

});

gulp.task('xslt-task', function () {

  return gulp.src([ // User Requirement Example
    'data/actual/*.xml',
  ]).pipe(xslt({
    abortOnError: true,
    jar: lib,
    xsl: 'data/actual/master.xsl',
    params: {
      lorem: '1 lorem value',
      ipsum: '2 ipsum value'
    },
    debugMode: false
  })).on('error', function handleError (err) {
    console.log('Caught Error');
    console.error(err);
  }).pipe(gulp.dest('dist/task-op'));
});

gulp.task('xslt-force-error', function () {

  return gulp.src([ // User Requirement Example
    'data/error/*.xml',
  ]).pipe(xslt({
    abortOnError: false,
    jar: lib,
    xsl: 'data/error/master.xsl',
    params: {
      lorem: '1 lorem value',
      ipsum: '2 ipsum value'
    },
    debugMode: false
  })).on('error', function handleError (err) {
    console.log('Caught Error');
    console.error(err);
  }).pipe(gulp.dest('dist/task-op'));
});

gulp.task('default', ['xslt-basic', 'xslt-params', 'xslt-dtd', 'xslt-task', /*'xslt-force-error'*/]);
