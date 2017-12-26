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

  function JWTInputNode (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name
    this.algoType = config.algoType || 'HASH'
    this.signature = config.signature || 'jwt'
    this.tokenPayload = config.tokenPayload || 'Node-RED-JWT'
    this.entireMessage = config.entireMessage
    this.selectedProperty = config.selectedProperty || 'token'
    this.publicKeyFile = config.publicKeyFile || null

    let node = this

    node.status({fill: 'green', shape: 'dot', text: 'active'})

    if (node.algoType === 'FILE') {
      node.cert = fs.readFileSync(node.publicKeyFile)
    }

    node.jwtVerify = function (msg, signature) {
      // TODO: Algo
      jwtCore.internalDebugLog('Verify Message ' + node.algoType)

      if (node.entireMessage) {
        msg = jwtLib.verify(msg, signature, function (err, decoded) {
          if (err) {
            node.error(err, msg)
          } else {
            node.send(decoded)
          }
        })
      } else {
        jwtLib.verify(msg[node.selectedProperty], signature, function (err, decoded) {
          if (err) {
            node.error(err, msg)
          } else {
            msg[node.selectedProperty] = decoded
            node.send(msg)
          }
        })
      }
    }

    node.on('input', function (msg) {
      switch (node.algoType) {
        case 'FILE':
          node.jwtVerify(msg, node.cert)
          break
        default:
          node.jwtVerify(msg, node.signature)
      }
    })
  }

  RED.nodes.registerType('JWT-IN', JWTInputNode)
}
