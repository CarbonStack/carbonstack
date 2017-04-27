module.exports = class UnprocessableError extends Error {
  constructor (...args) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 422
    })

    if (this.message == null) {
      this.message = 'Unprocessable: your parameters are not valid. please check again.'
    }
  }
}
