const { Rendezvous } = require('../../lib/db/models')

function index (req, res, next) {
  Rendezvous.find({})
    .then(rvs => {
      res.json({
        rvs
      })
    })
    .catch(next)
}

module.exports = {
  index
}
