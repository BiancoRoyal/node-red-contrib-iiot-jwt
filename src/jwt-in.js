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
    this.signature = config.signature || 'jwt'
    this.tokenPayload = config.tokenPayload || 'Node-RED-JWT'
    this.entireMessage = config.entireMessage
    this.selectedProperty = config.selectedProperty || 'token'

    let node = this

    node.status({fill: 'green', shape: 'dot', text: 'active'})

    node.on('input', function (msg) {
      // verify with default (HMAC SHA256)
      jwtCore.internalDebugLog('Verify Message HMAC SHA256')

      try {
        if (node.entireMessage) {
          msg = jwtLib.verify(msg, node.signature)
        } else {
          msg[node.selectedProperty] = jwtLib.verify(msg[node.selectedProperty], node.signature)
        }

        node.send(msg)
      } catch (err) {
        node.error(err, msg)
      }
    })
  }

  RED.nodes.registerType('JWT-IN', JWTInputNode)
}
