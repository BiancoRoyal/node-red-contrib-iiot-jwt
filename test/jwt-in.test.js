/**
 * Original Work Copyright 2014 IBM Corp.
 * node-red
 *
 * Copyright (c) 2017-2022 Klaus Landsdorf (http://node-red.plus/)
 * All rights reserved.
 * node-red-contrib-iiot-jwt - The MIT License
 *
 **/

'use strict'

var injectNode = require('node-red/nodes/core/core/20-inject')
var functionNode = require('node-red/nodes/core/core/80-function')
var inputNode = require('../src/jwt-in.js')

var helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

var testFlowPayload = [
  {
    'id': 'n1',
    'type': 'inject',
    'payload': 'eyJhbGciOiJIUzI1NiJ9.VGVzdA.QrGSd49pBydy_lJuAiCbNVG7_F6inUTJub7k_FpW7Tk',
    'payloadType': 'str',
    'once': true,
    'wires': [['n2', 'n3']]
  },
  { id: 'n2', type: 'helper' },
  {
    'id': 'n3',
    'type': 'JWT-IN',
    'selectedProperty': 'payload',
    'wires': [['n4']]
  },
  { id: 'n4', type: 'helper' }
]

var testFlowToken = [
  {
    'id': 'n1',
    'type': 'inject',
    'payload': 'Test',
    'payloadType': 'str',
    'once': true,
    'wires': [['n2', 'n3']]
  },
  { 'id': 'n2',
    'type': 'function',
    'func': "msg.token = 'eyJhbGciOiJIUzI1NiJ9.Tm9kZS1SRUQtSldU.-5uQr1GLmUwjw2b1DF8gWptQ3C1TKGppSBu5sV-MPEk';\nreturn msg;",
    'outputs': 1,
    'noerr': 0,
    'wires': [['n3', 'n4']]
  },
  { id: 'n3', type: 'helper' },
  {
    'id': 'n4',
    'type': 'JWT-IN',
    'wires': [['n5']]
  },
  { id: 'n5', type: 'helper' }
]

describe('JWT In node Testing', function () {
  beforeAll(function (done) {
    helper.startServer(function () {
      done()
    })
  })

  afterEach(function (done) {
    helper.unload().then(function () {
      done()
    }).catch(function () {
      done()
    })
  })

  afterAll(function (done) {
    helper.stopServer(function () {
      done()
    })
  })

  describe('Node', function () {
    it('node should be loaded', function (done) {
      helper.load([inputNode], [
        {
          'id': '1701afa1.842a7',
          'type': 'JWT-IN',
          'name': 'jwtInput',
          'wires': [[]]
        }
      ], function () {
        var nodeUnderTest = helper.getNode('1701afa1.842a7')
        expect(nodeUnderTest.name).toBe('jwtInput')

        done()
      }, function () {
        helper.log('function callback')
      })
    })

    it('should get a message', function (done) {
      helper.load([injectNode, inputNode], testFlowPayload, function () {
        let n2 = helper.getNode('n2')
        n2.on('input', function (msg) {
          expect(msg.payload).toBe('eyJhbGciOiJIUzI1NiJ9.VGVzdA.QrGSd49pBydy_lJuAiCbNVG7_F6inUTJub7k_FpW7Tk')
          done()
        })
      })
    })

    it('should verify a message', function (done) {
      helper.load([injectNode, inputNode], testFlowPayload, function () {
        let n4 = helper.getNode('n4')
        n4.on('input', function (msg) {
          expect(msg.payload).toBe('Test')
          done()
        })
      })
    })

    it('should have a verified token', function (done) {
      helper.load([injectNode, functionNode, inputNode], testFlowToken, function () {
        let n5 = helper.getNode('n5')
        n5.on('input', function (msg) {
          expect(msg.token).toBe('Node-RED-JWT')
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
