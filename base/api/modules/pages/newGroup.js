const { Unauthorized } = require('../../../lib/errors')

async function newGroupRoute (req, res, next) {
  if (req.user == null) throw new Unauthorized()

  res.json({})
}

module.exports = newGroupRoute
