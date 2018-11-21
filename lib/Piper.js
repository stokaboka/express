/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

class Piper {
  constructor () {
    this.functions = []
    this.val = null
    this.ctx = null
  }

  pipe (functions) {
    this.functions = functions
    return this
  }

  calc () {
    if (this.functions) {
      for (const func of this.functions) {
        this.val = func.call(this.ctx, this.val)
      }
    }
    return this
  }

  plus (value, property) {
    if (property) {
      this.val[property] = this.val[property] + value
    } else {
      this.val = this.val + value
    }
    return this
  }

  minus (value, property) {
    if (property) {
      this.val[property] = this.val[property] - value
    } else {
      this.val = this.val - value
    }
    return this
  }

  clear () {
    this.functions = []
    this.val = null
    return this
  }

  context (context) {
    if (context) {
      this.ctx = context
      return this
    } else {
      return this.ctx
    }
  }

  value (value) {
    if (value) {
      this.val = value
      return this
    } else {
      return this.val
    }
  }
}

module.exports = Piper
