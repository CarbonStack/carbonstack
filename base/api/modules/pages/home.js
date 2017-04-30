const { Rendezvous } = require('../../../lib/db/models')

async function home (req, res, next) {
  const rvs = await Rendezvous.find({})

  res.json({
    rvs
  })
}

module.exports = home
