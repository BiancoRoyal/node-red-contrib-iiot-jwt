/*
 The MIT License

 Copyright (c) 2017 - Klaus Landsdorf (http://bianco-royal.de/)
 All rights reserved.
 node-red-contrib-iiot-jwt
 */

'use strict'

const { series, src, dest } = require('gulp')
const htmlmin = require('gulp-htmlmin')
const jsdoc = require('gulp-jsdoc3')
const clean = require('gulp-clean')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const pump = require('pump')

function releaseIcons () {
  return src('src/icons/**/*').pipe(dest('jwt/icons'))
}

function docIcons () {
  return src('src/icons/**/*').pipe(dest('docs/gen/icons'))
}

function docImages () {
  return src('images/**/*').pipe(dest('docs/gen/images'))
}

function releaseLocal () {
  return src('src/locales/**/*').pipe(dest('jwt/locales'))
}

function releasePublicData () {
  return src('src/public/**/*').pipe(dest('jwt/public'))
}

function cleanProject () {
  return src(['jwt', 'docs/gen', 'jcoverage'], { allowEmpty: true })
    .pipe(clean({ force: true }))
}

function releaseWebContent () {
  return src('src/*.htm*')
    .pipe(htmlmin({
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
      maxLineLength: 120,
      preserveLineBreaks: false,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      conservativeCollapse: true,
      processScripts: ['text/x-red'],
      quoteCharacter: "'"
    }))
    .pipe(dest('jwt'))
}

function releaseJSContent (cb) {
  pump([
    src('src/**/*.js')
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(babel({ presets: ['@babel/env'] }))
      .pipe(uglify())
      .pipe(sourcemaps.write('maps')), dest('jwt')],
  cb)
}

function doc (cb) {
  src(['README.md', 'src/**/*.js'], { read: false })
    .pipe(jsdoc(cb))
}

exports.clean = cleanProject
exports.build = series(cleanProject, releaseWebContent, releaseJSContent, releaseLocal)
exports.buildDocs = series(doc, docIcons, docImages)
exports.publish = series(cleanProject, releaseWebContent, releaseJSContent, releaseLocal, releasePublicData, releaseIcons, doc, docIcons, docImages)
