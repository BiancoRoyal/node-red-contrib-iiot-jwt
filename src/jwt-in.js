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
    this.showErrors = config.showErrors

    // options
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

    let node = this

    node.status({ fill: 'green', shape: 'dot', text: 'active' })

    if (node.algoType === 'FILE') {
      try {
        node.cert = jwtCore.fs.readFileSync(jwtCore.path.join(__dirname, node.publicKeyFile))
      } catch (err) {
        if (node.showErrors) {
          node.error(err, { payload: '' })
        }
        jwtCore.internalDebugLog(err.message)
        jwtCore.internalDebugLog(jwtCore.path.join(__dirname, node.privateKeyFile))
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
      let algo = (node.algoType === 'FILE') ? node.algoFile : node.algoHash

      let options = {
        algorithm: algo
      }

      return node.fillWithOptions(msg, options)
    }

    node.getUnsignedOptions = function (msg) {
      let options = {
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
        msg = jwtLib.verify(msg, signature, (node.useOptions) ? node.getSignOptions() : {}, function (err, decodedMsg) {
          if (err) {
            node.handleError(err, msg)
          } else {
            decodedMsg.untrusted = false
            node.send(decodedMsg)
          }
        })
      } else {
        jwtLib.verify(msg[node.selectedProperty], signature, (node.useOptions) ? node.getSignOptions() : {}, function (err, decoded) {
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
        msg = jwtLib.verify(msg, signature, (node.useOptions) ? node.getUnsignedOptions() : {}, function (err, decodedMsg) {
          if (err) {
            node.handleError(err, msg)
          } else {
            decodedMsg.untrusted = false
            node.send(decodedMsg)
          }
        })
      } else {
        jwtLib.verify(msg[node.selectedProperty], signature, (node.useOptions) ? node.getUnsignedOptions() : {}, function (err, decoded) {
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
        msg = jwtLib.decode(msg, { complete: true })
      } else {
        msg[node.selectedProperty] = jwtLib.decode(msg[node.selectedProperty], { complete: true })
      }
      msg.untrusted = true
      node.send(msg)
    }

    node.on('input', function (msg) {
      switch (node.algoType) {
        case 'FILE':
          node.jwtVerify(msg, node.cert)
          break
        case 'NONE':
          node.jwtUnsigned(msg, node.signature)
          break
        case 'DECODE':
          node.decodeMessage(msg)
          break
        default:
          node.jwtVerify(msg, node.signature)
      }
    })
  }

  RED.nodes.registerType('JWT-IN', JWTInputNode)
}
