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
var delayNode = require('node-red/nodes/core/core/89-delay')
var inputNode = require('../../src/jwt-in.js')
var outputNode = require('../../src/jwt-out.js')

var jwtNodeSet = [injectNode, functionNode, delayNode, inputNode, outputNode]

var helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

const testEntireMessageFlow = [
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
        'n1f1',
        '2e9e94be.c27294'
      ]
    ]
  },
  { id: 'n1f1', type: 'helper' },
  {
    'id': '2e9e94be.c27294',
    'type': 'JWT-OUT',
    'name': '',
    'algoType': 'HASH',
    'signature': '',
    'algoHash': 'HS256',
    'privateKeyFile': '',
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
        '1a20574d.475b21'
      ]
    ]
  },
  { id: 'n2f1', type: 'helper' },
  {
    'id': '1a20574d.475b21',
    'type': 'JWT-IN',
    'name': '',
    'algoType': 'HASH',
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
      [
        'n3f1'
      ]
    ]
  },
  { id: 'n3f1', type: 'helper' }
]

const testOptionalsHashMessageFlow = [
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
        'n1f2',
        '2e9e94be.c27294'
      ]
    ]
  },
  { id: 'n1f2', type: 'helper' },
  {
    'id': '2e9e94be.c27294',
    'type': 'JWT-OUT',
    'name': '',
    'algoType': 'HASH',
    'signature': '',
    'algoHash': 'HS512',
    'privateKeyFile': '',
    'algoFile': 'RS256',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': true,
    'showErrors': false,
    'useOptions': true,
    'issuer': 'urn:issuer',
    'subject': 'subject',
    'audience': 'urn:foo',
    'jwtId': '5c0ecf0d5b28bd659a8a4625',
    'tokenExpires': true,
    'expiresIn': 60,
    'expiresInUnit': 's',
    'tokenNotBefore': true,
    'notBefore': 1,
    'notBeforeUnit': 's',
    'wires': [
      [
        'n2f2',
        'ad809de1.a85bd'
      ]
    ]
  },
  { id: 'n2f2', type: 'helper' },
  {
    'id': 'ad809de1.a85bd',
    'type': 'delay',
    'name': '',
    'pauseType': 'delay',
    'timeout': '2',
    'timeoutUnits': 'seconds',
    'rate': '1',
    'nbRateUnits': '1',
    'rateUnits': 'second',
    'randomFirst': '1',
    'randomLast': '5',
    'randomUnits': 'seconds',
    'drop': false,
    'wires': [
      [
        'n3f2',
        '1a20574d.475b21',
        '3d236890.683438'
      ]
    ]
  },
  { id: 'n3f2', type: 'helper' },
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
      ['n4f2']
    ]
  },
  { id: 'n4f2', type: 'helper' },
  {
    'id': '3d236890.683438',
    'type': 'JWT-IN',
    'name': '',
    'algoType': 'HASH',
    'signature': '',
    'publicKeyFile': '',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': true,
    'showErrors': false,
    'useOptions': true,
    'issuer': 'urn:issuer',
    'subject': 'subject',
    'audience': 'urn:foo',
    'jwtId': '5c0ecf0d5b28bd659a8a4625',
    'ignoreExpiration': false,
    'ignoreNotBefore': false,
    'clockTolerance': 1,
    'clockToleranceUnit': 's',
    'useMaxAge': false,
    'maxAge': 120,
    'maxAgeUnit': 's',
    'wires': [
      ['n5f2']
    ]
  },
  { id: 'n5f2', type: 'helper' }
]

const testMsgOptionalsHashMessageFlow = [
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
        '34dee285.63cd36'
      ]
    ]
  },
  {
    'id': '34dee285.63cd36',
    'type': 'function',
    'name': 'options',
    'func': "msg.jwt = {\n    options : {\n        audience: 'urn:foo', \n        issuer: 'urn:issuer', \n        jwtid: 'jwtid', \n        subject: 'subject' \n    }\n}\nreturn msg;",
    'outputs': 1,
    'noerr': 0,
    'wires': [
      [
        'n1f3',
        '2e9e94be.c27294'
      ]
    ]
  },
  { id: 'n1f3', type: 'helper' },
  {
    'id': '2e9e94be.c27294',
    'type': 'JWT-OUT',
    'name': '',
    'algoType': 'HASH',
    'signature': '',
    'algoHash': 'HS512',
    'privateKeyFile': '',
    'algoFile': 'RS256',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': true,
    'showErrors': true,
    'useOptions': true,
    'issuer': 'urn:issuer1',
    'subject': 'subject1',
    'audience': 'urn:foo1',
    'jwtId': '5c0ecf0d5b28bd659a8a4625',
    'tokenExpires': true,
    'expiresIn': 60,
    'expiresInUnit': 's',
    'tokenNotBefore': true,
    'notBefore': 1,
    'notBeforeUnit': 's',
    'wires': [
      [
        'n2f3',
        'ad809de1.a85bd'
      ]
    ]
  },
  { id: 'n2f3', type: 'helper' },
  {
    'id': 'ad809de1.a85bd',
    'type': 'delay',
    'name': '',
    'pauseType': 'delay',
    'timeout': '2',
    'timeoutUnits': 'seconds',
    'rate': '1',
    'nbRateUnits': '1',
    'rateUnits': 'second',
    'randomFirst': '1',
    'randomLast': '5',
    'randomUnits': 'seconds',
    'drop': false,
    'wires': [
      [
        'n3f3',
        '1a20574d.475b21',
        '3d236890.683438'
      ]
    ]
  },
  { id: 'n3f3', type: 'helper' },
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
      ['n4f3']
    ]
  },
  { id: 'n4f3', type: 'helper' },
  {
    'id': '3d236890.683438',
    'type': 'JWT-IN',
    'name': '',
    'algoType': 'HASH',
    'signature': '',
    'publicKeyFile': '',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': true,
    'showErrors': false,
    'useOptions': true,
    'issuer': 'urn:issuer',
    'subject': 'subject',
    'audience': 'urn:foo',
    'jwtId': '5c0ecf0d5b28bd659a8a4625',
    'ignoreExpiration': false,
    'ignoreNotBefore': false,
    'clockTolerance': 1,
    'clockToleranceUnit': 's',
    'useMaxAge': false,
    'maxAge': 120,
    'maxAgeUnit': 's',
    'wires': [
      ['n5f3']
    ]
  },
  { id: 'n5f3', type: 'helper' }
]

const testMsgOptionalsHashPropertyFlow = [
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
        '34dee285.63cd36'
      ]
    ]
  },
  {
    'id': '34dee285.63cd36',
    'type': 'function',
    'name': 'options',
    'func': "msg.jwt = {\n    options : {\n        audience: 'urn:foo', \n        issuer: 'urn:issuer', \n        jwtid: 'jwtid', \n        subject: 'subject' \n    }\n}\nreturn msg;",
    'outputs': 1,
    'noerr': 0,
    'wires': [
      [
        'n1f4',
        '2e9e94be.c27294'
      ]
    ]
  },
  { id: 'n1f4', type: 'helper' },
  {
    'id': '2e9e94be.c27294',
    'type': 'JWT-OUT',
    'name': '',
    'algoType': 'HASH',
    'signature': '',
    'algoHash': 'HS512',
    'privateKeyFile': '',
    'algoFile': 'RS256',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': false,
    'showErrors': true,
    'useOptions': false,
    'issuer': 'urn:issuer1',
    'subject': 'subject1',
    'audience': 'urn:foo1',
    'jwtId': '5c0ecf0d5b28bd659a8a4625',
    'tokenExpires': true,
    'expiresIn': 60,
    'expiresInUnit': 's',
    'tokenNotBefore': true,
    'notBefore': 1,
    'notBeforeUnit': 's',
    'wires': [
      [
        'n2f4',
        'ad809de1.a85bd'
      ]
    ]
  },
  { id: 'n2f4', type: 'helper' },
  {
    'id': 'ad809de1.a85bd',
    'type': 'delay',
    'name': '',
    'pauseType': 'delay',
    'timeout': '2',
    'timeoutUnits': 'seconds',
    'rate': '1',
    'nbRateUnits': '1',
    'rateUnits': 'second',
    'randomFirst': '1',
    'randomLast': '5',
    'randomUnits': 'seconds',
    'drop': false,
    'wires': [
      [
        'n3f4',
        '1a20574d.475b21',
        '3d236890.683438'
      ]
    ]
  },
  { id: 'n3f4', type: 'helper' },
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
      ['n4f4']
    ]
  },
  { id: 'n4f4', type: 'helper' },
  {
    'id': '3d236890.683438',
    'type': 'JWT-IN',
    'name': '',
    'algoType': 'HASH',
    'signature': '',
    'publicKeyFile': '',
    'tokenPayload': '',
    'selectedProperty': '',
    'entireMessage': false,
    'showErrors': false,
    'useOptions': false,
    'issuer': 'urn:issuer',
    'subject': 'subject',
    'audience': 'urn:foo',
    'jwtId': '5c0ecf0d5b28bd659a8a4625',
    'ignoreExpiration': false,
    'ignoreNotBefore': false,
    'clockTolerance': 1,
    'clockToleranceUnit': 's',
    'useMaxAge': false,
    'maxAge': 120,
    'maxAgeUnit': 's',
    'wires': [
      ['n5f4']
    ]
  },
  { id: 'n5f4', type: 'helper' }
]

describe('JWT nodes e2e hash Testing', function () {
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

  describe('Node message OUT to IN', function () {
    it('should transfer signed message node2', function (done) {
      helper.load(jwtNodeSet, testEntireMessageFlow, function () {
        let n2 = helper.getNode('n2f1')

        n2.on('input', function (msg) {
          expect(msg.payload).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
          done()
        })
      })
    })

    it('should transfer signed message node3', function (done) {
      helper.load(jwtNodeSet, testEntireMessageFlow, function () {
        let n3 = helper.getNode('n3f1')

        n3.on('input', function (msg) {
          expect(msg.payload).toEqual('test message')
          expect(msg.untrusted).toBe(false)
          done()
        })
      })
    })
  })

  describe('Node message with optionals OUT to IN', function () {
    it('should transfer signed hash message with optionals node2', function (done) {
      helper.load(jwtNodeSet, testOptionalsHashMessageFlow, function () {
        let n2 = helper.getNode('n2f2')

        n2.on('input', function (msg) {
          expect(msg.payload).toMatch(/^eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9/)
          done()
        })
      })
    })

    it('should transfer signed hash message with optionals node4', function (done) {
      helper.load(jwtNodeSet, testOptionalsHashMessageFlow, function () {
        let n4 = helper.getNode('n4f2')

        n4.on('input', function (msg) {
          expect(msg.payload.payload).toEqual('test message')
          expect(msg.untrusted).toBe(true)
          done()
        })
      })
    })

    it('should transfer signed hash message with optionals node5', function (done) {
      helper.load(jwtNodeSet, testOptionalsHashMessageFlow, function () {
        let n5 = helper.getNode('n5f2')

        n5.on('input', function (msg) {
          expect(msg.payload).toEqual('test message')
          expect(msg.untrusted).toBe(false)
          done()
        })
      })
    })
  })

  describe('Node message with injected optionals OUT to IN', function () {
    it('should sign message with injected optionals node2', function (done) {
      helper.load(jwtNodeSet, testMsgOptionalsHashMessageFlow, function () {
        let n2 = helper.getNode('n2f3')

        n2.on('input', function (msg) {
          expect(msg.payload).toMatch(/^eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9/)
          done()
        })
      })
    })

    it('should sign message with injected optionals node4', function (done) {
      helper.load(jwtNodeSet, testMsgOptionalsHashMessageFlow, function () {
        let n4 = helper.getNode('n4f3')

        n4.on('input', function (msg) {
          expect(msg.payload.payload).toEqual('test message')
          expect(msg.payload.jwt.options).toBeDefined()
          expect(msg.payload.aud).toBe('urn:foo')
          expect(msg.payload.iss).toBe('urn:issuer')
          expect(msg.payload.sub).toBe('subject')
          expect(msg.payload.jti).toBe('jwtid')
          expect(msg.untrusted).toBe(true)
          done()
        })
      })
    })

    it('should sign message with injected optionals node5', function (done) {
      helper.load(jwtNodeSet, testMsgOptionalsHashMessageFlow, function () {
        let n5 = helper.getNode('n5f3')

        n5.on('input', function (msg) {
          expect(msg.payload).toEqual('test message')
          expect(msg.jwt.options).toBeDefined()
          expect(msg.aud).toBe('urn:foo')
          expect(msg.iss).toBe('urn:issuer')
          expect(msg.sub).toBe('subject')
          expect(msg.jti).toBe('jwtid')
          expect(msg.untrusted).toBe(false)
          done()
        })
      })
    })
  })

  describe('Node property with injected unused optionals OUT to IN', function () {
    it('should sign property with injected unused optionals node2', function (done) {
      helper.load(jwtNodeSet, testMsgOptionalsHashPropertyFlow, function () {
        let n2 = helper.getNode('n2f4')

        n2.on('input', function (msg) {
          expect(msg.token).toMatch(/^eyJhbGciOiJIUzUxMiJ9/)
          done()
        })
      })
    })

    it('should sign property with injected unused optionals node4', function (done) {
      helper.load(jwtNodeSet, testMsgOptionalsHashPropertyFlow, function () {
        let n4 = helper.getNode('n4f4')

        n4.on('input', function (msg) {
          expect(msg.payload).toEqual('test message')
          expect(msg.jwt.options).toBeDefined()
          expect(msg.untrusted).toBe(true)
          done()
        })
      })
    })

    it('should sign property with injected unused optionals node5', function (done) {
      helper.load(jwtNodeSet, testMsgOptionalsHashPropertyFlow, function () {
        let n5 = helper.getNode('n5f4')

        n5.on('input', function (msg) {
          expect(msg.payload).toEqual('test message')
          expect(msg.jwt.options).toBeDefined()
          expect(msg.untrusted).toBe(false)
          done()
        })
      })
    })
  })
})
