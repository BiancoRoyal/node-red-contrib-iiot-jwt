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
    this.entireMessage = config.entireMessage
    this.selectedProperty = config.selectedProperty || 'token'

    let node = this

    node.status({fill: 'green', shape: 'dot', text: 'active'})

    node.on('input', function (msg) {
      // sign with default (HMAC SHA256)
      jwtCore.internalDebugLog('Sign Message HMAC SHA256')

      try {
        if (node.entireMessage) {
          msg = jwtLib.sign(msg, node.signature)
        } else {
          if (!msg[node.selectedProperty]) {
            msg[node.selectedProperty] = node.tokenPayload
          }
          msg[node.selectedProperty] = jwtLib.sign(msg[node.selectedProperty], node.signature)
        }

        node.send(msg)
      } catch (err) {
        node.error(err, msg)
      }
    })
  }

  RED.nodes.registerType('JWT-OUT', JWTOutputNode)
}
