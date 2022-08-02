/*
 MIT License

 Copyright (c) 2017-2022 Klaus Landsdorf (http://node-red.plus/)
 All rights reserved.
 node-red-contrib-iiot-jwt
 */
'use strict'

jest.setTimeout(5000)

describe('JWT Core', function () {
  let core = require('../../src/core/jwt-core')

  describe('calculate time in milliseconds by a time unit', function () {
    it('should return the right sec. transformation when the value is present', function (done) {
      expect(core.calcSecondsByTimeAndUnit(1, 'ms')).toBe(0.001)
      done()
    })

    it('should return the right sec. transformation when the value is present', function (done) {
      expect(core.calcSecondsByTimeAndUnit(10, 'ms')).toBe(0.01)
      done()
    })

    it('should return the right sec. transformation when the value is present', function (done) {
      expect(core.calcSecondsByTimeAndUnit(100, 'ms')).toBe(0.1)
      done()
    })

    it('should return the right sec. transformation when the value is present', function (done) {
      expect(core.calcSecondsByTimeAndUnit(1, 's')).toBe(1)
      done()
    })

    it('should return the right sec. transformation when the value is present', function (done) {
      expect(core.calcSecondsByTimeAndUnit(1.2, 's')).toBe(1.2)
      done()
    })

    it('should return the right sec. transformation when the value is present', function (done) {
      expect(core.calcSecondsByTimeAndUnit(1, 'm')).toBe(60)
      done()
    })

    it('should return the right sec. transformation when the value is present', function (done) {
      expect(core.calcSecondsByTimeAndUnit(1, 'h')).toBe(3600)
      done()
    })

    it('should return 1 sec. when the value is not present', function (done) {
      expect(core.calcSecondsByTimeAndUnit(1, 'wrong')).toBe(1)
      done()
    })

    it('should return 1 sec. when the value is not present', function (done) {
      expect(core.calcSecondsByTimeAndUnit(1, 'msec.')).toBe(1)
      done()
    })
  })
})
