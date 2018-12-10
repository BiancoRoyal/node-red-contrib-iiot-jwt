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

var helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

var testFlowPayload = [
  {
    'id': 'n1',
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
        'n2', 'n3'
      ]
    ]
  },
  { id: 'n2', type: 'helper' },
  {
    'id': 'n3',
    'type': 'JWT-OUT',
    'name': '',
    'algoType': 'HASH',
    'signature': '',
    'algoHash': 'HS256',
    'privateKeyFile': '',
    'algoFile': 'RS256',
    'tokenPayload': '',
    'selectedProperty': 'payload',
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
        'n4'
      ]
    ]
  },
  { id: 'n4', type: 'helper' }
]

var testFlowToken = [
  {
    'id': 'n1',
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
        'n2', 'n3'
      ]
    ]
  },
  { id: 'n2', type: 'helper' },
  {
    'id': 'n3',
    'type': 'JWT-OUT',
    'name': '',
    'algoType': 'HASH',
    'signature': '',
    'algoHash': 'HS256',
    'privateKeyFile': '',
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
        'n4'
      ]
    ]
  },
  { id: 'n4', type: 'helper' }
]

var testNoneFlowPayload = [
  {
    'id': 'n1f2',
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
        'n2f2', 'n3f2'
      ]
    ]
  },
  { id: 'n2f2', type: 'helper' },
  {
    'id': 'n3f2',
    'type': 'JWT-OUT',
    'name': '',
    'algoType': 'NONE',
    'signature': '',
    'algoHash': 'HS256',
    'privateKeyFile': '',
    'algoFile': 'RS256',
    'tokenPayload': '',
    'selectedProperty': 'payload',
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
        'n4f2'
      ]
    ]
  },
  { id: 'n4f2', type: 'helper' }
]

describe('JWT Out node Testing', function () {
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
      helper.load([outputNode], [
        {
          'id': '910e6b99.8ba038',
          'type': 'JWT-OUT',
          'name': 'jwtOutput',
          'signature': '',
          'wires': [[]]
        }
      ], function () {
        var nodeUnderTest = helper.getNode('910e6b99.8ba038')
        expect(nodeUnderTest.name).toBe('jwtOutput')

        done()
      }, function () {
        helper.log('function callback')
      })
    })

    it('should have a message', function (done) {
      helper.load([injectNode, outputNode], testFlowPayload, function () {
        let n1 = helper.getNode('n1')
        n1.on('input', function (msg) {
          expect(msg.payload).toBe('test message')
          done()
        })
      })
    })

    it('should have a token', function (done) {
      helper.load([injectNode, outputNode], testFlowToken, function () {
        let n3 = helper.getNode('n3')
        n3.on('input', function (msg) {
          expect(msg.token).toBeDefined()
          expect(msg.token).toMatch(/^eyJhbGciOiJIUzI1NiJ9.*./)
          done()
        })
      })
    })

    it('should sign a message with HASH algo type', function (done) {
      helper.load([injectNode, outputNode], testFlowPayload, function () {
        let n4 = helper.getNode('n4')
        n4.on('input', function (msg) {
          expect(msg.payload).toBeDefined()
          expect(msg.payload).toMatch(/^eyJhbGciOiJIUzI1NiJ9.*./)
          done()
        })
      })
    })

    it('should have a message with NONE algo type', function (done) {
      helper.load([injectNode, outputNode], testNoneFlowPayload, function () {
        let n4 = helper.getNode('n4f2')
        n4.on('input', function (msg) {
          expect(msg.payload).toMatch(/^eyJhbGciOiJIUzI1NiJ9.*./)
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
