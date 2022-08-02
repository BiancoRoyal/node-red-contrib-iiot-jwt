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

var outputNode = require('../src/jwt-out.js')

var helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

const flows = require("./flows/out-flows");

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
      helper.load([injectNode, outputNode], flows.testFlowPayload, function () {
        let n2 = helper.getNode('n2')
        n2.on('input', function (msg) {
          expect(msg.payload).toBe('test message')
          done()
        })
      })
    })

    it('should have a token', function (done) {
      helper.load([injectNode, outputNode], flows.testFlowToken, function () {
        let n3 = helper.getNode('n3')
        n3.on('input', function (msg) {
          expect(msg.token).toBeDefined()
          expect(msg.token).toMatch(/^eyJhbGciOiJIUzI1NiJ9.*./)
          done()
        })
      })
    })

    it('should sign a message with HASH algo type', function (done) {
      helper.load([injectNode, outputNode], flows.testFlowPayload, function () {
        let n4 = helper.getNode('n4')
        n4.on('input', function (msg) {
          expect(msg.payload).toBeDefined()
          expect(msg.payload).toMatch(/^eyJhbGciOiJIUzI1NiJ9.*./)
          done()
        })
      })
    })

    it('should have a message with NONE algo type', function (done) {
      helper.load([injectNode, outputNode], flows.testNoneFlowPayload, function () {
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
