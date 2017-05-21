module.exports = class BadRequestError extends Error {
  constructor (...args) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 400
    })

    if (this.message == null) {
      this.message = 'Bad Request: Invalid request.'
    }
  }
}
