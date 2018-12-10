/*
 The MIT License

 Copyright (c) 2017 - Klaus Landsdorf (http://bianco-royal.de/)
 All rights reserved.
 node-red-contrib-iiot-jwt
 */
'use strict'

var de = de || { biancoroyal: { jwt: { core: {} } } } // eslint-disable-line no-use-before-define
de.biancoroyal.jwt.core.internalDebugLog = de.biancoroyal.jwt.core.internalDebugLog || require('debug')('jsonWebToken:core') // eslint-disable-line no-use-before-define
de.biancoroyal.jwt.core.detailDebugLog = de.biancoroyal.jwt.core.detailDebugLog || require('debug')('jsonWebToken:core:details') // eslint-disable-line no-use-before-define
de.biancoroyal.jwt.core.specialDebugLog = de.biancoroyal.jwt.core.specialDebugLog || require('debug')('jsonWebToken:core:special') // eslint-disable-line no-use-before-define
de.biancoroyal.jwt.core.path = de.biancoroyal.jwt.core.path || require('path') // eslint-disable-line no-use-before-define
de.biancoroyal.jwt.core.fs = de.biancoroyal.jwt.core.fs || require('fs') // eslint-disable-line no-use-before-define

de.biancoroyal.jwt.core.calcSecondsByTimeAndUnit = function (time, unit) {
  let convertedTime

  switch (unit) {
    case 'ms':
      convertedTime = time / 1000
      break
    case 's':
      convertedTime = time // seconds
      break
    case 'm':
      convertedTime = time * 60 // minutes
      break
    case 'h':
      convertedTime = time * 3600 // hours
      break
    default:
      convertedTime = 1 // 1 sec.
      break
  }

  return convertedTime
}

module.exports = de.biancoroyal.jwt.core
