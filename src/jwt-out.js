/*
 The MIT License

 Copyright (c) 2017 - Klaus Landsdorf (http://bianco-royal.de/)
 All rights reserved.
 node-red-contrib-iiot-jwt
 */
'use strict'

module.exports = function (RED) {
  const jwtCore = require('./core/jwt-core')
  const jwtLib = require('jsonwebtoken')

  function JWTOutputNode (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name
    this.signature = config.signature || 'jwt'
    this.tokenPayload = config.tokenPayload || 'Node-RED-JWT'
    this.tokenExpires = config.tokenExpires
    this.expiresIn = config.expiresIn || 60
    this.expiresInUnit = config.expiresInUnit || 's'
    this.entireMessage = config.entireMessage
    this.selectedProperty = config.selectedProperty || 'token'

    let node = this

    node.status({fill: 'green', shape: 'dot', text: 'active'})

    node.calcExpiresInByUnit = function (rate, rateUnit) {
      switch (rateUnit) {
        case 'ms':
          break
        case 's':
          rate = parseInt(rate) * 1000 // seconds
          break
        case 'm':
          rate = parseInt(rate) * 60000 // minutes
          break
        case 'h':
          rate = parseInt(rate) * 3600000 // hours
          break
        default:
          rate = 10000 // 10 sec.
          break
      }

      return Math.floor(Date.now() / 1000) + rate
    }

    node.on('input', function (msg) {
      // sign with default (HMAC SHA256)
      jwtCore.internalDebugLog('Sign Message HMAC SHA256')

      try {
        if (node.entireMessage) {
          if (node.tokenExpires) {
            msg = jwtLib.sign({
              exp: node.calcExpiresInByUnit(node.expiresIn, node.expiresInUnit),
              data: msg
            }, node.signature)
          } else {
            msg = jwtLib.sign(msg, node.signature)
          }
        } else {
          if (!msg[node.selectedProperty]) {
            msg[node.selectedProperty] = node.tokenPayload
          }

          if (node.tokenExpires) {
            msg[node.selectedProperty] = jwtLib.sign({
              exp: node.calcExpiresInByUnit(node.expiresIn, node.expiresInUnit),
              data: msg[node.selectedProperty]
            }, node.signature)
          } else {
            msg[node.selectedProperty] = jwtLib.sign(msg[node.selectedProperty], node.signature)
          }
        }

        node.send(msg)
      } catch (err) {
        node.error(err, msg)
      }
    })
  }

  RED.nodes.registerType('JWT-OUT', JWTOutputNode)
}
