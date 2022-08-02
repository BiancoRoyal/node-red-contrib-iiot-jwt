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

const flows = require("./flows/file-e2e-flows");

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
      helper.load(jwtNodeSet, flows.testRS256PayloadFlow, function () {
        let n2 = helper.getNode('n2f1')

        n2.on('input', function (msg) {
          expect(msg.payload).toBe('test content')
          expect(msg.token).toMatch(/^eyJhbGciOiJSUzI1NiJ9/)
          done()
        })
      })
    })

    it('should transfer file signed content node3', function (done) {
      helper.load(jwtNodeSet, flows.testRS256PayloadFlow, function () {
        let n3 = helper.getNode('n3f1')

        n3.on('input', function (msg) {
          expect(msg.payload).toEqual('test content')
          expect(msg.untrusted).toBe(true)
          done()
        })
      })
    })

    it('should transfer file signed content', function (done) {
      helper.load(jwtNodeSet, flows.testRS256PayloadFlow, function () {
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
      helper.load(jwtNodeSet, flows.testRS256MessageFlow, function () {
        let n2 = helper.getNode('n2f1')

        n2.on('input', function (msg) {
          expect(msg.payload).toMatch(/^eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9/)
          done()
        })
      })
    })

    it('should transfer file signed message node3', function (done) {
      helper.load(jwtNodeSet, flows.testRS256MessageFlow, function () {
        let n3 = helper.getNode('n3f1')

        n3.on('input', function (msg) {
          expect(msg.payload.payload).toEqual('test message')
          expect(msg.untrusted).toBe(true)
          done()
        })
      })
    })

    it('should transfer file signed message node4', function (done) {
      helper.load(jwtNodeSet, flows.testRS256MessageFlow, function () {
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
