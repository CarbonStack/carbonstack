module.exports = function asyncWrap (asyncFn) {
  return (req, res, next) => {
    asyncFn(req, res, next)
      .catch(next)
  }
}
