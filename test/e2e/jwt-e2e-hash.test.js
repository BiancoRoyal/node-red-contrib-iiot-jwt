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

const injectNode = require("@node-red/nodes/core/common/20-inject");
const functionNode = require("@node-red/nodes/core/function/10-function");
const delayNode = require('@node-red/nodes/core/function/89-delay')

var inputNode = require('../../src/jwt-in.js')
var outputNode = require('../../src/jwt-out.js')

var jwtNodeSet = [injectNode, functionNode, delayNode, inputNode, outputNode]

var helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

const flows = require("./flows/hash-e2e-flows");

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
      helper.load(jwtNodeSet, flows.testEntireMessageFlow, function () {
        let n2 = helper.getNode('n2f1')

        n2.on('input', function (msg) {
          expect(msg.payload).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
          done()
        })
      })
    })

    it('should transfer signed message node3', function (done) {
      helper.load(jwtNodeSet, flows.testEntireMessageFlow, function () {
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
      helper.load(jwtNodeSet, flows.testOptionalsHashMessageFlow, function () {
        let n2 = helper.getNode('n2f2')

        n2.on('input', function (msg) {
          expect(msg.payload).toMatch(/^eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9/)
          done()
        })
      })
    })

    it('should transfer signed hash message with optionals node4', function (done) {
      helper.load(jwtNodeSet, flows.testOptionalsHashMessageFlow, function () {
        let n4 = helper.getNode('n4f2')

        n4.on('input', function (msg) {
          expect(msg.payload.payload).toEqual('test message')
          expect(msg.untrusted).toBe(true)
          done()
        })
      })
    })

    it('should transfer signed hash message with optionals node5', function (done) {
      helper.load(jwtNodeSet, flows.testOptionalsHashMessageFlow, function () {
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
      helper.load(jwtNodeSet, flows.testMsgOptionalsHashMessageFlow, function () {
        let n2 = helper.getNode('n2f3')

        n2.on('input', function (msg) {
          expect(msg.payload).toMatch(/^eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9/)
          done()
        })
      })
    })

    it('should sign message with injected optionals node4', function (done) {
      helper.load(jwtNodeSet, flows.testMsgOptionalsHashMessageFlow, function () {
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
      helper.load(jwtNodeSet, flows.testMsgOptionalsHashMessageFlow, function () {
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
      helper.load(jwtNodeSet, flows.testMsgOptionalsHashPropertyFlow, function () {
        let n2 = helper.getNode('n2f4')

        n2.on('input', function (msg) {
          expect(msg.token).toMatch(/^eyJhbGciOiJIUzUxMiJ9/)
          done()
        })
      })
    })

    it('should sign property with injected unused optionals node4', function (done) {
      helper.load(jwtNodeSet, flows.testMsgOptionalsHashPropertyFlow, function () {
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
      helper.load(jwtNodeSet, flows.testMsgOptionalsHashPropertyFlow, function () {
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
