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

jest.setTimeout(10000)

var injectNode = require('node-red/nodes/core/core/20-inject')
var functionNode = require('node-red/nodes/core/core/80-function')
var inputNode = require('../../src/jwt-in.js')
var outputNode = require('../../src/jwt-out.js')

var jwtNodeSet = [injectNode, functionNode, inputNode, outputNode]

var helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

var testRS256PayloadFlow = [
  {
    'id': 'e347a834.107f48',
    'type': 'inject',
    'name': '',
    'topic': '',
    'payload': 'test content',
    'payloadType': 'str',
    'repeat': '',
    'crontab': '',
    'once': true,
    'wires': [
      [
        '2e9e94be.c27294'
      ]
    ]
  },
  { id: 'n1f1', type: 'helper' },
  {
    'id': '2e9e94be.c27294',
    'type': 'JWT-OUT',
    'name': '',
    'algoType': 'FILE',
    'signature': '',
    'algoHash': '',
    'privateKeyFile': '../examples/keys/private.pem',
    'algoFile': 'RS256',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': false,
    'showErrors': false,
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
        '1a20574d.475b21',
        '3d236890.683438'
      ]
    ]
  },
  { id: 'n2f1', type: 'helper' },
  {
    'id': '1a20574d.475b21',
    'type': 'JWT-IN',
    'name': '',
    'algoType': 'DECODE',
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
      [ 'n3f1' ]
    ]
  },
  { id: 'n3f1', type: 'helper' },
  {
    'id': '3d236890.683438',
    'type': 'JWT-IN',
    'name': '',
    'algoType': 'FILE',
    'signature': '',
    'publicKeyFile': '../examples/keys/public.pem',
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
      [ 'n4f1' ]
    ]
  },
  { id: 'n4f1', type: 'helper' }
]

var testRS256MessageFlow = [
  {
    'id': 'e347a834.107f48',
    'type': 'inject',
    'name': '',
    'topic': '',
    'payload': 'test message',
    'payloadType': 'str',
    'repeat': '',
    'crontab': '',
    'once': true,
    'wires': [
      [
        '2e9e94be.c27294'
      ]
    ]
  },
  { id: 'n1f1', type: 'helper' },
  {
    'id': '2e9e94be.c27294',
    'type': 'JWT-OUT',
    'name': '',
    'algoType': 'FILE',
    'signature': '',
    'algoHash': '',
    'privateKeyFile': '../examples/keys/private.pem',
    'algoFile': 'RS256',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': true,
    'showErrors': false,
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
        '1a20574d.475b21',
        '3d236890.683438'
      ]
    ]
  },
  { id: 'n2f1', type: 'helper' },
  {
    'id': '1a20574d.475b21',
    'type': 'JWT-IN',
    'name': '',
    'algoType': 'DECODE',
    'signature': '',
    'publicKeyFile': '',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': true,
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
      [ 'n3f1' ]
    ]
  },
  { id: 'n3f1', type: 'helper' },
  {
    'id': '3d236890.683438',
    'type': 'JWT-IN',
    'name': '',
    'algoType': 'FILE',
    'signature': '',
    'publicKeyFile': '../examples/keys/public.pem',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': true,
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
      [ 'n4f1' ]
    ]
  },
  { id: 'n4f1', type: 'helper' }
]

describe('JWT nodes e2e file Testing', function () {
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

  describe('Node payload OUT to IN', function () {
    it('should transfer file signed content node2', function (done) {
      helper.load(jwtNodeSet, testRS256PayloadFlow, function () {
        let n2 = helper.getNode('n2f1')

        n2.on('input', function (msg) {
          expect(msg.payload).toBe('test content')
          expect(msg.token).toMatch(/^eyJhbGciOiJSUzI1NiJ9/)
          done()
        })
      })
    })

    it('should transfer file signed content node3', function (done) {
      helper.load(jwtNodeSet, testRS256PayloadFlow, function () {
        let n3 = helper.getNode('n3f1')

        n3.on('input', function (msg) {
          expect(msg.payload).toEqual('test content')
          expect(msg.untrusted).toBe(true)
          done()
        })
      })
    })

    it('should transfer file signed content', function (done) {
      helper.load(jwtNodeSet, testRS256PayloadFlow, function () {
        let n4 = helper.getNode('n4f1')

        n4.on('input', function (msg) {
          expect(msg.payload).toEqual('test content')
          expect(msg.untrusted).toBe(false)
          done()
        })
      })
    })
  })

  describe('Node message OUT to IN', function () {
    it('should transfer file signed message node2', function (done) {
      helper.load(jwtNodeSet, testRS256MessageFlow, function () {
        let n2 = helper.getNode('n2f1')

        n2.on('input', function (msg) {
          expect(msg.payload).toMatch(/^eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9/)
          done()
        })
      })
    })

    it('should transfer file signed message node3', function (done) {
      helper.load(jwtNodeSet, testRS256MessageFlow, function () {
        let n3 = helper.getNode('n3f1')

        n3.on('input', function (msg) {
          expect(msg.payload.payload).toEqual('test message')
          expect(msg.untrusted).toBe(true)
          done()
        })
      })
    })

    it('should transfer file signed message node4', function (done) {
      helper.load(jwtNodeSet, testRS256MessageFlow, function () {
        let n4 = helper.getNode('n4f1')

        n4.on('input', function (msg) {
          expect(msg.payload).toEqual('test message')
          expect(msg.untrusted).toBe(false)
          done()
        })
      })
    })
  })
})
