module.exports = class ForbiddenError extends Error {
  constructor (...args) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 403
    })
  }
}
