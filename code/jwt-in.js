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

  function JWTInputNode (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name
    this.algoType = config.algoType || 'HASH'
    this.signature = config.signature || 'jwt'
    this.publicKeyFile = config.publicKeyFile || null
    this.tokenPayload = config.tokenPayload || 'Node-RED-JWT'
    this.selectedProperty = config.selectedProperty || 'token'
    this.useOptions = config.useOptions
    this.entireMessage = config.entireMessage
    this.showErrors = config.showErrors // options

    this.issuer = config.issuer || ''
    this.subject = config.subject || ''
    this.audience = config.audience || ''
    this.jwtid = config.jwtid || ''
    this.ignoreExpiration = config.ignoreExpiration
    this.ignoreNotBefore = config.ignoreNotBefore
    this.clockTolerance = config.clockTolerance || 1
    this.clockToleranceUnit = config.clockToleranceUnit || 's'
    this.useMaxAge = config.useMaxAge
    this.maxAge = config.maxAge || 120
    this.maxAgeUnit = config.maxAgeUnit || 's'
    const node = this
    node.status({
      fill: 'green',
      shape: 'dot',
      text: 'active'
    })

    if (node.algoType === 'FILE') {
      try {
        const localFileName = jwtCore.path.join(__dirname, node.publicKeyFile)

        if (jwtCore.fs.existsSync(localFileName)) {
          node.cert = jwtCore.fs.readFileSync(localFileName, 'utf8')
        } else {
          node.cert = jwtCore.fs.readFileSync(node.publicKeyFile, 'utf8')
        }
      } catch (err) {
        if (node.showErrors) {
          node.error(err, {
            payload: ''
          })
        }

        jwtCore.internalDebugLog(err.message)
        jwtCore.internalDebugLog('searched on: ' + node.publicKeyFile)
        jwtCore.internalDebugLog('searched on: ' + jwtCore.path.join(__dirname, node.publicKeyFile))
      }

      node.algorithms = ['RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512']
    } else {
      node.algorithms = ['HS256', 'HS384', 'HS512']
    }

    node.fillWithOptions = function (msg, options) {
      options.issuer = node.issuer
      options.subject = node.subject
      options.audience = node.audience
      options.jwtid = node.jwtid

      if (!node.ignoreExpiration || !node.ignoreNotBefore) {
        options.clockTolerance = jwtCore.calcSecondsByTimeAndUnit(node.clockTolerance, node.clockToleranceUnit)
      }

      if (node.useMaxAge) {
        options.maxAge = jwtCore.calcSecondsByTimeAndUnit(node.maxAge, node.maxAgeUnit)
      }

      return options
    }

    node.getSignOptions = function (msg) {
      const algo = node.algoType === 'FILE' ? node.algoFile : node.algoHash
      const options = {
        algorithm: algo
      }
      return node.fillWithOptions(msg, options)
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

    node.jwtVerify = function (msg, signature) {
      jwtCore.internalDebugLog('Verify Message From ' + node.algoType + ' Algorithms Allowed ' + node.algorithms)

      if (node.entireMessage) {
        msg = jwtLib.verify(msg, signature, node.useOptions ? node.getSignOptions() : {}, function (err, decodedMsg) {
          if (err) {
            node.handleError(err, msg)
          } else {
            decodedMsg.untrusted = false
            node.send(decodedMsg)
          }
        })
      } else {
        jwtLib.verify(msg[node.selectedProperty], signature, node.useOptions ? node.getSignOptions() : {}, function (err, decoded) {
          if (err) {
            node.handleError(err, msg)
          } else {
            msg[node.selectedProperty] = decoded
            msg.untrusted = false
            node.send(msg)
          }
        })
      }
    }

    node.jwtUnsigned = function (msg, signature) {
      jwtCore.internalDebugLog('Message With Token')

      if (node.entireMessage) {
        msg = jwtLib.verify(msg, signature, node.useOptions ? node.getUnsignedOptions() : {}, function (err, decodedMsg) {
          if (err) {
            node.handleError(err, msg)
          } else {
            decodedMsg.untrusted = false
            node.send(decodedMsg)
          }
        })
      } else {
        jwtLib.verify(msg[node.selectedProperty], signature, node.useOptions ? node.getUnsignedOptions() : {}, function (err, decoded) {
          if (err) {
            node.handleError(err, msg)
          } else {
            msg[node.selectedProperty] = decoded
            msg.untrusted = false
            node.send(msg)
          }
        })
      }
    }

    node.decodeMessage = function (msg) {
      jwtCore.internalDebugLog('Decode Message Untrusted')

      if (node.entireMessage) {
        msg = jwtLib.decode(msg, {
          complete: true
        })
      } else {
        msg[node.selectedProperty] = jwtLib.decode(msg[node.selectedProperty], {
          complete: true
        })
      }

      msg.untrusted = true
      node.send(msg)
    }

    node.on('input', function (msg) {
      let message = msg

      if (node.entireMessage) {
        message = msg.payload
      }

      switch (node.algoType) {
        case 'FILE':
          node.jwtVerify(message, node.cert)
          break

        case 'NONE':
          node.jwtUnsigned(message, node.signature)
          break

        case 'DECODE':
          node.decodeMessage(message)
          break

        default:
          node.jwtVerify(message, node.signature)
      }
    })
  }

  RED.nodes.registerType('JWT-IN', JWTInputNode)
}
// # sourceMappingURL=maps/jwt-in.js.map
