module.exports = class NotFound extends Error {
  constructor (...args) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 404
    })

    this.message = 'NotFound: the resource doesn\'t exist. check the url.'
  }
}
