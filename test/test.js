/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

const assert = require('assert')
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.strict.equal([1, 2, 3].indexOf(4), -1)
    })
    it('double done', function (done) {
      // Calling `done()` twice is an error
      setImmediate(done)
      // setImmediate(done)
    })
  })
})
