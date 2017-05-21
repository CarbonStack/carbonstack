module.exports = class ConflictError extends Error {
  constructor (...args) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 409
    })

    if (this.message == null) {
      this.message = 'Conflict: The given indicator is already occupied by other resources.'
    }
  }
}
