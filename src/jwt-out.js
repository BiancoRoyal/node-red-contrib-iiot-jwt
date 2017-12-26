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
    this.signature = config.signature
    this.entireMessage = config.entireMessage

    let node = this

    node.status({fill: 'green', shape: 'dot', text: 'active'})

    node.on('input', function (msg) {
      // sign with default (HMAC SHA256)
      jwtCore.internalDebugLog('Sign Message HMAC SHA256')

      try {
        if (node.entireMessage) {
          msg = jwtLib.sign(msg, node.signature || 'jwt')
        } else {
          msg.payload = jwtLib.sign(msg.payload, node.signature || 'jwt')
        }
      } catch (err) {
        node.error(err, msg)
      }

      node.send(msg)
    })
  }

  RED.nodes.registerType('JWT-OUT', JWTOutputNode)
}
