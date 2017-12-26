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
  const fs = require('fs')

  function JWTOutputNode (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name
    this.algoType = config.algoType || 'HASH'
    this.signature = config.signature || 'jwt'
    this.tokenPayload = config.tokenPayload || 'Node-RED-JWT'
    this.tokenExpires = config.tokenExpires
    this.expiresIn = config.expiresIn || 60
    this.expiresInUnit = config.expiresInUnit || 's'
    this.entireMessage = config.entireMessage
    this.selectedProperty = config.selectedProperty || 'token'
    this.privateKeyFile = config.privateKeyFile || null

    let node = this

    node.status({fill: 'green', shape: 'dot', text: 'active'})

    if (node.algoType === 'FILE') {
      node.cert = fs.readFileSync(node.privateKeyFile)
    }

    node.calcExpiresInByUnit = function (value, unit) {
      let result = 1000

      switch (unit) {
        case 'ms':
          break
        case 's':
          result = parseInt(value) * 1000 // seconds
          break
        case 'm':
          result = parseInt(value) * 60000 // minutes
          break
        case 'h':
          result = parseInt(value) * 3600000 // hours
          break
        default:
          result = 10000 // 10 sec.
          break
      }

      return result
    }

    node.jwtSign = function (msg, signature) {
      // TODO: Algo
      jwtCore.internalDebugLog('Sign Message ' + node.algoType)

      try {
        if (node.entireMessage) {
          if (node.tokenExpires) {
            msg = jwtLib.sign({ data: msg }, signature, { expiresIn: node.calcExpiresInByUnit(node.expiresIn, node.expiresInUnit) })
          } else {
            msg = jwtLib.sign(msg, signature)
          }
        } else {
          if (!msg[node.selectedProperty]) {
            msg[node.selectedProperty] = node.tokenPayload
          }

          if (node.tokenExpires) {
            msg[node.selectedProperty] = jwtLib.sign({ data: msg[node.selectedProperty] }, signature, { expiresIn: node.calcExpiresInByUnit(node.expiresIn, node.expiresInUnit) })
          } else {
            msg[node.selectedProperty] = jwtLib.sign(msg[node.selectedProperty], signature)
          }
        }

        node.send(msg)
      } catch (err) {
        node.error(err, msg)
      }
    }

    node.on('input', function (msg) {
      switch (node.algoType) {
        case 'FILE':
          node.jwtSign(msg, node.cert)
          break
        default:
          node.jwtSign(msg, node.signature)
      }
    })
  }

  RED.nodes.registerType('JWT-OUT', JWTOutputNode)

  RED.httpAdmin.get('/jwt/algo/types', RED.auth.needsPermission('jwt.algo.types'), function (req, res) {
    res.json(['HMAC', 'RSA', 'ECDSA', 'none'])
  })
}
