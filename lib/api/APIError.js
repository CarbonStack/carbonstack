export default class APIError extends Error {
  constructor (...args) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: 'APIError'
    })
  }
}
