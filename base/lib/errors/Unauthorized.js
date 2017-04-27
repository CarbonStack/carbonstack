module.exports = class UnauthorizedError extends Error {
  constructor (...args) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 401
    })

    if (this.message == null) {
      this.message = 'Unauthorized: you have to login.'
    }
  }
}
