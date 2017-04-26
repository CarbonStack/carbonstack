module.exports = class ForbiddenError extends Error {
  constructor (...args) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 403
    })

    this.message = 'Forbidden: you have no authority to access here. ask the admin if you have a problem with this.'
  }
}
