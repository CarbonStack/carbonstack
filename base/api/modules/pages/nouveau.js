const { Rendezvous } = require('../../../lib/db/models')
const { Unauthorized } = require('../../../lib/errors')

async function nouveau (req, res, next) {
  if (req.user == null) throw new Unauthorized()

  const rvs = await Rendezvous.find({})

  res.json({
    rvs
  })
}

module.exports = nouveau
