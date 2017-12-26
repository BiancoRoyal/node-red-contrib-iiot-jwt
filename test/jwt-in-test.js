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
var inputNode = require('../src/jwt-in.js')
var helper = require('./helper.js')
var testFlowPayload = [
  {
    "id": "n1",
    "type": "inject",
    "payload": "eyJhbGciOiJIUzI1NiJ9.VGVzdA.QrGSd49pBydy_lJuAiCbNVG7_F6inUTJub7k_FpW7Tk",
    "payloadType": "str",
    "once": true,
    "wires": [["n2", "n3"]]
  },
  {id:"n2", type:"helper"},
  {
    "id": "n3",
    "type": "JWT-IN",
    "selectedProperty": "payload",
    "wires": [["n4"]]
  },
  {id:"n4", type:"helper"}
]

var testFlowToken = [
  {
    "id": "n1",
    "type": "inject",
    "payload": "Test",
    "payloadType": "str",
    "once": true,
    "wires": [["n2", "n3"]]
  },
  {id:"n2", type:"helper"},
  {
    "id": "n3",
    "type": "JWT-IN",
    "selectedProperty": "topic",
    "wires": [["n4"]]
  },
  {id:"n4", type:"helper"}
]

describe('JWT In node Testing', function () {
  before(function (done) {
    helper.startServer(done)
  })

  afterEach(function () {
    helper.unload()
  })

  describe('Node', function () {
    it('node should be loaded', function (done) {
      helper.load([inputNode], [
        {"id":"1701afa1.842a7","type":"JWT-IN","z":"a0c278ae.d0f6f8","name":"jwtInput","signature":"","x":640,"y":280,"wires":[[]]}
      ], function () {

        var nodeUnderTest = helper.getNode('1701afa1.842a7')
        nodeUnderTest.should.have.property('name', 'jwtInput')

        done()
      }, function () {
        helper.log('function callback')
      })
    })

    it('should get a message', function(done) {
      helper.load([injectNode, inputNode], testFlowPayload, function() {
        let n2 = helper.getNode("n2")
        n2.on("input", function(msg) {
          msg.should.have.property('payload', 'eyJhbGciOiJIUzI1NiJ9.VGVzdA.QrGSd49pBydy_lJuAiCbNVG7_F6inUTJub7k_FpW7Tk')
          done()
        })
      })
    })

    it('should verify a message', function(done) {
      helper.load([injectNode, inputNode], testFlowPayload, function() {
        let n4 = helper.getNode("n4")
        n4.on("input", function(msg) {
          msg.should.have.property('payload', 'Test');
          done()
        })
      })
    })
  })

  describe('post', function () {
    it('should fail for invalid node', function (done) {
      helper.request().post('/jwt-in/invalid').expect(404).end(done)
    })
  })
})
