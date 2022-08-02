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

var inputNode = require('../../src/jwt-in.js')
var outputNode = require('../../src/jwt-out.js')

var jwtNodeSet = [injectNode, functionNode, inputNode, outputNode]

var helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

const flows = require("./flows/none-e2e-flows");

describe('JWT nodes e2e unsigned Testing', function () {
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
    it('should transfer unsigned message node2', function (done) {
      helper.load(jwtNodeSet, flows.testUnsignedPayloadFlow, function () {
        let n2 = helper.getNode('n2f1')

        n2.on('input', function (msg) {
          expect(msg.payload).toEqual({
            'text': 'test content'
          })
          done()
        })
      })
    })

    it('should transfer unsigned message node3', function (done) {
      helper.load(jwtNodeSet, flows.testUnsignedPayloadFlow, function () {
        let n3 = helper.getNode('n3f1')

        n3.on('input', function (msg) {
          expect(msg.payload).toEqual({
            'text': 'test content'
          })
          done()
        })
      })
    })
  })

  describe('Node message OUT to IN', function () {
    it('should transfer unsigned message node2', function (done) {
      helper.load(jwtNodeSet, flows.testEntireUnsignedMessageFlow, function () {
        let n2 = helper.getNode('n2f2')

        n2.on('input', function (msg) {
          expect(msg.payload).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
          done()
        })
      })
    })

    it('should transfer unsigned message node3', function (done) {
      helper.load(jwtNodeSet, flows.testEntireUnsignedMessageFlow, function () {
        let n3 = helper.getNode('n3f2')

        n3.on('input', function (msg) {
          expect(msg.payload).toEqual('test message')
          expect(msg.untrusted).toBe(false)
          done()
        })
      })
    })
  })
})
