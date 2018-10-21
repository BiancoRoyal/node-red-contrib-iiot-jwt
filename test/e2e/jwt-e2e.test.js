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

jest.setTimeout(10000)

var injectNode = require('node-red/nodes/core/core/20-inject')
var functionNode = require('node-red/nodes/core/core/80-function')
var inputNode = require('../../src/jwt-in.js')
var outputNode = require('../../src/jwt-out.js')

var jwtNodeSet = [injectNode, functionNode, inputNode, outputNode]

var helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

var testUnsignedPayloadFlow = [
  {
    'id': 'ba201f96.24b0d8',
    'type': 'inject',
    'name': '',
    'topic': 'TestTopic',
    'payload': '{ "text": "test content" }',
    'payloadType': 'json',
    'repeat': '',
    'crontab': '',
    'once': true,
    'startDelay': '1',
    'wires': [
      [
        'n1f1',
        '59d58a47.02d6a4'
      ]
    ]
  },
  { id: 'n1f1', type: 'helper' },
  {
    'id': '59d58a47.02d6a4',
    'type': 'JWT-OUT',
    'name': '',
    'algoType': 'NONE',
    'signature': '',
    'algoHash': 'HS256',
    'privateKeyFile': '',
    'algoFile': 'RS256',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': false,
    'showErrors': true,
    'useOptions': false,
    'issuer': '',
    'subject': '',
    'audience': '',
    'jwtId': '',
    'tokenExpires': false,
    'expiresIn': 60,
    'expiresInUnit': 's',
    'tokenNotBefore': false,
    'notBefore': 1,
    'notBeforeUnit': 's',
    'wires': [
      [
        'n2f1',
        'f43bebe.cfa3f98'
      ]
    ]
  },
  { id: 'n2f1', type: 'helper' },
  {
    'id': 'f43bebe.cfa3f98',
    'type': 'JWT-IN',
    'name': '',
    'algoType': 'NONE',
    'signature': '',
    'publicKeyFile': '',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': false,
    'showErrors': false,
    'useOptions': false,
    'issuer': '',
    'subject': '',
    'audience': '',
    'jwtId': '',
    'ignoreExpiration': false,
    'ignoreNotBefore': false,
    'clockTolerance': 1,
    'clockToleranceUnit': 's',
    'useMaxAge': false,
    'maxAge': 120,
    'maxAgeUnit': 's',
    'wires': [
      [
        'n3f1'
      ]
    ]
  },
  { id: 'n3f1', type: 'helper' }
]

describe('JWT nodes e2e Testing', function () {
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
    it('should transfer unsigned message', function (done) {
      helper.load(jwtNodeSet, testUnsignedPayloadFlow, function () {
        let n2 = helper.getNode('n2f1')
        let n3 = helper.getNode('n3f1')

        n2.on('input', function (msg) {
          expect(msg.payload).toEqual({
            'text': 'test content'
          })
        })

        n3.on('input', function (msg) {
          expect(msg.payload).toEqual({
            'text': 'test content'
          })
          done()
        })
      })
    })
  })
})
