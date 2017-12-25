/*
 The MIT License

 Copyright (c) 2017 - Klaus Landsdorf (http://bianco-royal.de/)
 All rights reserved.
 node-red-contrib-jwt
 */
'use strict'

module.exports = function (RED) {
  const jwtCore = require('./core/jwt-core')
  const jwtLib = require('jsonwebtoken')

  function JWTInputNode (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name
    this.signature = config.signature

    let node = this

    node.status({fill: 'green', shape: 'dot', text: 'active'})

    node.on('input', function (token) {
      // verify with default (HMAC SHA256)
      jwtCore.internalDebugLog('Verify Message HMAC SHA256')
      node.send(jwtLib.verify(token, node.signature || 'jwt'))
    })
  }

  RED.nodes.registerType('JWT-IN', JWTInputNode)
}
