# Gulp Saxon XSLT

Bring your own Saxon library to transform XML with XSL 2 or 3

## Features

- Easily use `<xsl:import />` to take advantage of other external libraries
- Supply parameters (variables) to the XSL file
- Splitting output via `<xsl:result-document>` adds documents to the gulp stream
- Supports DTDs referenced from XML
- Handle your own error events

## Usage

### Install

```shell
npm install @informatix8/gulp-saxon-xslt --save-dev
```

## Example

```javascript
const gulp = require('gulp');
const xslt = require('@informatix8/gulp-saxon-xslt');

function xslt() {
  return gulp
    .src('*.xml', { buffer: false })
    .pipe(
      xslt({
        jar: 'saxon9he.jar',
        xsl: 'stylesheet.xsl',
        params: {
          param1: 'foo',
          param2: 'bar'
        },
        debugMode: false,
        abortOnError: true
      })
    )
    .on('end', function handleEnd() {
      console.log('XSLT Ended');
    })
    .on('error', function handleError(err) {
      console.log('Caught Error');
      console.error(err);
    })
    .pipe(gulp.dest('dist/'));
}

exports.xslt = xslt;
```

## Release

```shell
git tag -a vX.Y.Z
git push origin master
git push origin --tags
npm publish --access=public .
```
