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

var inputNode = require('../src/jwt-in.js')
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
      helper.load([inputNode], [
        {"id":"1701afa1.842a7","type":"JWT-IN","z":"a0c278ae.d0f6f8","name":"jwtInput","signature":"","x":640,"y":280,"wires":[[]]}
      ], function () {

        var nodeUnderTest = helper.getNode('1701afa1.842a7')
        nodeUnderTest.should.have.property('name', 'jwtInput')

        done()
      }, function () {
        helper.log('function callback')
      })
    })
  })

  describe('post', function () {
    it('should fail for invalid node', function (done) {
      helper.request().post('/jwt-in/invalid').expect(404).end(done)
    })
  })
})
