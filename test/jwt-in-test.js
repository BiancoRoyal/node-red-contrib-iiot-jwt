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
        {
          "id": "8482fcf8.62d6c",
          "type": "JWT-IN",
          "z": "11c6703a.132f6",
          "name": "jwtInput",
          "x": 220,
          "y": 130,
          "wires": [
            []
          ]
        }
      ], function () {

        var dnpRead = helper.getNode('8482fcf8.62d6c')
        dnpRead.should.have.property('name', 'jwtInput')

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
