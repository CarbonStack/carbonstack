const { Rendezvous } = require('../../../lib/db/models')
const { Unauthorized } = require('../../../lib/errors')

function nouveau (req, res, next) {
  if (req.user == null) {
    return next(new Unauthorized())
  }

  Rendezvous.find({})
    .then(rvs => {
      res.json({
        rvs
      })
    })
}

module.exports = nouveau
