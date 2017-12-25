/**
 * Original Work Copyright 2014 IBM Corp.
 * node-red
 *
 * Copyright (c) 2017, Klaus Landsdorf (http://bianco-royal.de/)
 * All rights reserved.
 * node-red-contrib-jwt - The MIT License
 *
 **/

'use strict'

var outputNode = require('../src/jwt-out.js')
var helper = require('./helper.js')

describe('Read node Testing', function () {
  before(function (done) {
    helper.startServer(done)
  })

  afterEach(function () {
    helper.unload()
  })

  describe('Node', function () {
    it('simple read node should be loaded', function (done) {
      helper.load([outputNode], [
        {"id":"910e6b99.8ba038","type":"JWT-OUT","z":"a0c278ae.d0f6f8","name":"jwtOutput","signature":"","x":440,"y":280,"wires":[[]]}
      ], function () {

        var nodeUnderTest = helper.getNode('910e6b99.8ba038')
        nodeUnderTest.should.have.property('name', 'jwtOutput')

        done()
      }, function () {
        helper.log('function callback')
      })
    })
  })

  describe('post', function () {
    it('should fail for invalid node', function (done) {
      helper.request().post('/jwt-out/invalid').expect(404).end(done)
    })
  })
})
