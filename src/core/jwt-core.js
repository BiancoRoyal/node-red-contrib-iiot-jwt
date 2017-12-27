/*
 The MIT License

 Copyright (c) 2017 - Klaus Landsdorf (http://bianco-royal.de/)
 All rights reserved.
 node-red-contrib-iiot-jwt
 */
'use strict'

var de = de || {biancoroyal: {jwt: {core: {}}}} // eslint-disable-line no-use-before-define
de.biancoroyal.jwt.core.internalDebugLog = de.biancoroyal.jwt.core.internalDebugLog || require('debug')('jsonWebToken:core') // eslint-disable-line no-use-before-define
de.biancoroyal.jwt.core.detailDebugLog = de.biancoroyal.jwt.core.detailDebugLog || require('debug')('jsonWebToken:core:details') // eslint-disable-line no-use-before-define
de.biancoroyal.jwt.core.specialDebugLog = de.biancoroyal.jwt.core.specialDebugLog || require('debug')('jsonWebToken:core:special') // eslint-disable-line no-use-before-define

de.biancoroyal.jwt.core.calcSecondsByUnit = function (value, unit) {
  let result = 1

  switch (unit) {
    case 'ms':
      result = parseInt(value) * 1000
      break
    case 'm':
      result = parseInt(value) * 60 // minutes
      break
    case 'h':
      result = parseInt(value) * 3600 // hours
      break
    default:
      result = parseInt(value)
      break
  }

  return result
}

module.exports = de.biancoroyal.jwt.core
