/**
 * Original Work Copyright 2014 IBM Corp.
 * node-red
 *
 * Copyright (c) 2017, Klaus Landsdorf (http://bianco-royal.de/)
 * All rights reserved.
 * node-red-contrib-iiot-jwt - The MIT License
 *
 **/

'use strict'


var assert = require('chai').assert
var injectNode = require('node-red/nodes/core/core/20-inject.js')
var outputNode = require('../src/jwt-out.js')
var helper = require('./helper.js')
var testFlowPayload = [
  {
    "id": "n1",
    "type": "inject",
    "name": "",
    "topic": "",
    "payload": "test message",
    "payloadType": "str",
    "repeat": "",
    "crontab": "",
    "once": true,
    "wires": [
      [
        "n2", "n3"
      ]
    ]
  },
  {id:"n2", type:"helper"},
  {
    "id": "n3",
    "type": "JWT-OUT",
    "name": "",
    "algoType": "HASH",
    "signature": "",
    "algoHash": "HS256",
    "privateKeyFile": "",
    "algoFile": "RS256",
    "tokenPayload": "",
    "selectedProperty": "payload",
    "entireMessage": false,
    "showErrors": false,
    "useOptions": false,
    "issuer": "",
    "subject": "",
    "audience": "",
    "jwtId": "",
    "tokenExpires": false,
    "expiresIn": 60,
    "expiresInUnit": "s",
    "tokenNotBefore": false,
    "notBefore": 1,
    "notBeforeUnit": "s",
    "wires": [
      [
        "n4"
      ]
    ]
  },
  {id:"n4", type:"helper"}
]

var testFlowToken = [
  {
    "id": "n1",
    "type": "inject",
    "name": "",
    "topic": "",
    "payload": "test message",
    "payloadType": "str",
    "repeat": "",
    "crontab": "",
    "once": true,
    "wires": [
      [
        "n2", "n3"
      ]
    ]
  },
  {id:"n2", type:"helper"},
  {
    "id": "n3",
    "type": "JWT-OUT",
    "name": "",
    "algoType": "HASH",
    "signature": "",
    "algoHash": "HS256",
    "privateKeyFile": "",
    "algoFile": "RS256",
    "tokenPayload": "",
    "selectedProperty": "",
    "entireMessage": false,
    "showErrors": false,
    "useOptions": false,
    "issuer": "",
    "subject": "",
    "audience": "",
    "jwtId": "",
    "tokenExpires": false,
    "expiresIn": 60,
    "expiresInUnit": "s",
    "tokenNotBefore": false,
    "notBefore": 1,
    "notBeforeUnit": "s",
    "wires": [
      [
        "n4"
      ]
    ]
  },
  {id:"n4", type:"helper"}
]

describe('JWT Out node Testing', function () {
  before(function (done) {
    helper.startServer(done)
  })

  afterEach(function () {
    helper.unload()
  })

  describe('Node', function () {
    it('node should be loaded', function (done) {
      helper.load([outputNode], [
        {
          "id":"910e6b99.8ba038",
          "type":"JWT-OUT",
          "name":"jwtOutput",
          "signature":"",
          "wires":[[]]
        }
      ], function () {

        var nodeUnderTest = helper.getNode('910e6b99.8ba038')
        nodeUnderTest.should.have.property('name', 'jwtOutput')

        done()
      }, function () {
        helper.log('function callback')
      })
    })

    it('should have a message', function(done) {
      helper.load([injectNode, outputNode], testFlowPayload, function() {
        let n1 = helper.getNode("n1")
        n1.on("input", function(msg) {
          msg.should.have.property('payload', 'test message')
          done()
        })
      })
    })

    it('should sign a message', function(done) {
      helper.load([injectNode, outputNode], testFlowPayload, function() {
        let n2 = helper.getNode("n2")
        let n4 = helper.getNode("n4")
        n4.on("input", function(msg) {
          msg.should.have.property('payload')
          assert.match(msg.payload, /^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.*./)
          done()
        })
      })
    })

    it('should have a token', function(done) {
      helper.load([injectNode, outputNode], testFlowToken, function() {
        let n4 = helper.getNode("n3")
        n4.on("input", function(msg) {
          msg.should.have.property('token')
          assert.match(msg.token, /^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.*./)
          done()
        })
      })
    })
  })

  describe('post', function () {
    it('should fail for invalid node', function (done) {
      helper.request().post('/jwt-out/invalid').expect(404).end(done)
    })
  })
})
