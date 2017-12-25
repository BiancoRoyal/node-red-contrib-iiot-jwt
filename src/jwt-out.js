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

  function JWTOutputNode (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name
    this.signature = config.signature

    let node = this

    node.status({fill: 'green', shape: 'dot', text: 'active'})

    node.on('input', function (msg) {
      // sign with default (HMAC SHA256)
      jwtCore.internalDebugLog('Sign Message HMAC SHA256')
      node.send(jwtLib.sign(msg, node.signature || 'jwt'))
    })
  }

  RED.nodes.registerType('JWT-OUT', JWTOutputNode)
}
