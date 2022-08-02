/*
 The MIT License

 Copyright (c) 2017-2022 Klaus Landsdorf (http://node-red.plus/)
 All rights reserved.
 node-red-contrib-iiot-jwt
 */
'use strict'

module.exports = function (RED) {
  const jwtCore = require('./core/jwt-core')

  const jwtLib = require('jsonwebtoken')

  const ObjectID = require('bson').ObjectID

  function JWTOutputNode (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name
    this.algoType = config.algoType || 'HASH'
    this.signature = config.signature || 'jwt'
    this.algoHash = config.algoHash || 'HS256'
    this.privateKeyFile = config.privateKeyFile || null
    this.algoFile = config.algoFile || 'RS256'
    this.tokenPayload = config.tokenPayload || 'Node-RED-JWT'
    this.selectedProperty = config.selectedProperty || 'token'
    this.useOptions = config.useOptions
    this.entireMessage = config.entireMessage
    this.showErrors = config.showErrors // options

    this.issuer = config.issuer || ''
    this.subject = config.subject || ''
    this.audience = config.audience || ''
    this.jwtid = config.jwtid || ''
    this.tokenExpires = config.tokenExpires
    this.expiresIn = config.expiresIn || 60
    this.expiresInUnit = config.expiresInUnit || 's'
    this.tokenNotBefore = config.tokenNotBefore
    this.notBefore = config.notBefore || 1
    this.notBeforeUnit = config.notBeforeUnit || 's'
    const node = this
    node.status({
      fill: 'green',
      shape: 'dot',
      text: 'active'
    })

    if (node.algoType === 'FILE') {
      try {
        const localFileName = jwtCore.path.join(__dirname, node.privateKeyFile)

        if (jwtCore.fs.existsSync(localFileName)) {
          node.cert = jwtCore.fs.readFileSync(localFileName, 'utf8')
        } else {
          node.cert = jwtCore.fs.readFileSync(node.privateKeyFile, 'utf8')
        }
      } catch (err) {
        if (node.showErrors) {
          node.error(err, {
            payload: ''
          })
        }

        jwtCore.internalDebugLog(err.message)
        jwtCore.internalDebugLog('searched on: ' + node.privateKeyFile)
        jwtCore.internalDebugLog('searched on: ' + jwtCore.path.join(__dirname, node.privateKeyFile))
      }
    }

    node.fillWithOptions = function (msg, options) {
      if (msg.jwt && msg.jwt.options) {
        options.issuer = msg.jwt.options.issuer || node.issuer
        options.subject = msg.jwt.options.subject || node.subject
        options.audience = msg.jwt.options.audience || node.audience
        options.jwtid = msg.jwt.options.jwtid || node.jwtid
      } else {
        options.issuer = node.issuer
        options.subject = node.subject
        options.audience = node.audience
        options.jwtid = node.jwtid
      }

      if (node.tokenExpires) {
        options.expiresIn = jwtCore.calcSecondsByTimeAndUnit(node.expiresIn, node.expiresInUnit)
      }

      if (node.tokenNotBefore) {
        options.notBefore = jwtCore.calcSecondsByTimeAndUnit(node.notBefore, node.notBeforeUnit)
      }

      return options
    }

    node.getSignOptions = function (msg) {
      const options = node.getAlgorithmOption()
      return node.fillWithOptions(msg, options)
    }

    node.getAlgorithmOption = function () {
      return {
        algorithm: node.algoType === 'FILE' ? node.algoFile : node.algoHash
      }
    }

    node.getUnsignedOptions = function (msg) {
      const options = {
        algorithm: 'none'
      }
      return node.fillWithOptions(msg, options)
    }

    node.handleError = function (err, msg) {
      if (node.showErrors) {
        node.error(err, msg)
      }

      jwtCore.internalDebugLog(err.message)
    }

    node.jwtSign = function (msg, signature) {
      try {
        const basicOptions = node.getAlgorithmOption()

        if (node.entireMessage) {
          msg = {
            payload: jwtLib.sign(msg, signature, node.useOptions ? node.getSignOptions(msg) : basicOptions)
          }
        } else {
          if (!msg[node.selectedProperty]) {
            msg[node.selectedProperty] = node.tokenPayload
          }

          msg[node.selectedProperty] = jwtLib.sign(msg[node.selectedProperty], signature, node.useOptions ? node.getSignOptions(msg) : basicOptions)
        }

        node.send(msg)
      } catch (err) {
        node.handleError(err, msg)
      }
    }

    node.jwtUnsigned = function (msg, signature) {
      jwtCore.internalDebugLog('Unsigned Message')

      try {
        if (node.entireMessage) {
          msg = {
            payload: jwtLib.sign(msg, signature, node.useOptions ? node.getUnsignedOptions(msg) : {})
          }
        } else {
          if (!msg[node.selectedProperty]) {
            msg[node.selectedProperty] = node.tokenPayload
          }

          msg[node.selectedProperty] = jwtLib.sign(msg[node.selectedProperty], signature, node.useOptions ? node.getUnsignedOptions(msg) : {})
        }

        node.send(msg)
      } catch (err) {
        node.handleError(err, msg)
      }
    }

    node.on('input', function (msg) {
      switch (node.algoType) {
        case 'FILE':
          jwtCore.internalDebugLog('Sign Message With File ' + node.privateKeyFile + ' And Algorithm ' + node.algoFile)
          node.jwtSign(msg, node.cert)
          break

        case 'NONE':
          node.jwtUnsigned(msg, node.signature)
          break

        default:
          jwtCore.internalDebugLog('Sign Message With Hash Algorithm ' + node.algoHash)
          node.jwtSign(msg, node.signature)
      }
    })
  }

  RED.nodes.registerType('JWT-OUT', JWTOutputNode)
  RED.httpAdmin.get('/jwt/object/getid', RED.auth.needsPermission('jwt.object.getid'), function (req, res) {
    res.json(new ObjectID())
  })
}
// # sourceMappingURL=maps/jwt-out.js.map
