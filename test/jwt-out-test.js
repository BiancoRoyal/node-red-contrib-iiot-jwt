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

var injectNode = require('node-red/nodes/core/core/20-inject.js')
var outputNode = require('../src/jwt-out.js')
var helper = require('./helper.js')
var testFlowPayload = [
  {
    "id": "3b8e682a.850b38",
    "type": "inject",
    "payload": "Test",
    "payloadType": "str",
    "once": true,
    "wires": [
      [
        "f348091d.d27b6",
        "n1"
      ]
    ]
  },
  {
    "id": "f348091d.d27b6",
    "type": "JWT-OUT",
    "z": "a0c278ae.d0f6f8",
    "name": "",
    "signature": "",
    "entireMessage": false,
    "selectedProperty": "payload",
    "wires": [
      [
        "n2"
      ]
    ]
  },
  {id:"n1", type:"helper"},
  {id:"n2", type:"helper"},
]

var testFlowToken = [
  {
    "id": "3b8e682a.850b38",
    "type": "inject",
    "payload": "Test",
    "payloadType": "str",
    "once": true,
    "wires": [
      [
        "f348091d.d27b6",
        "n1"
      ]
    ]
  },
  {
    "id": "f348091d.d27b6",
    "type": "JWT-OUT",
    "z": "a0c278ae.d0f6f8",
    "name": "",
    "signature": "",
    "entireMessage": false,
    "wires": [
      [
        "n2"
      ]
    ]
  },
  {id:"n1", type:"helper"},
  {id:"n2", type:"helper"},
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
          msg.should.have.property('payload', 'Test')
          done()
        })
      })
    })

    it('should sign a message', function(done) {
      helper.load([injectNode, outputNode], testFlowPayload, function() {
        let n2 = helper.getNode("n2")
        n2.on("input", function(msg) {
          msg.should.have.property('payload', 'eyJhbGciOiJIUzI1NiJ9.VGVzdA.QrGSd49pBydy_lJuAiCbNVG7_F6inUTJub7k_FpW7Tk')
          done()
        })
      })
    })

    it('should have a token', function(done) {
      helper.load([injectNode, outputNode], testFlowToken, function() {
        let n2 = helper.getNode("n2")
        n2.on("input", function(msg) {
          msg.should.have.property('token', 'eyJhbGciOiJIUzI1NiJ9.Tm9kZS1SRUQtSldU.-5uQr1GLmUwjw2b1DF8gWptQ3C1TKGppSBu5sV-MPEk');
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
