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

var inputNode = require('../src/jwt-in.js')

var helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

const flows = require("./flows/in-flows");

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
      helper.load([injectNode, inputNode], flows.testFlowPayload, function () {
        let n2 = helper.getNode('n2')
        n2.on('input', function (msg) {
          expect(msg.payload).toBe('eyJhbGciOiJIUzI1NiJ9.VGVzdA.QrGSd49pBydy_lJuAiCbNVG7_F6inUTJub7k_FpW7Tk')
          done()
        })
      })
    })

    it('should verify a message', function (done) {
      helper.load([injectNode, inputNode], flows.testFlowPayload, function () {
        let n4 = helper.getNode('n4')
        n4.on('input', function (msg) {
          expect(msg.payload).toBe('Test')
          done()
        })
      })
    })

    it('should have a verified token', function (done) {
      helper.load([injectNode, functionNode, inputNode], flows.testFlowToken, function () {
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
