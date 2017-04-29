const { Rendezvous, Issue } = require('../../../lib/db/models')
const { NotFound } = require('../../../lib/errors')

async function rvRoute (req, res, next) {
  const rv = await Rendezvous
    .findOne({
      uniqueName: req.params.rvUniqueName
    })
  if (rv == null) throw new NotFound()

  const issues = await Issue
    .find({
      rv: rv._id
    })

  res.json({
    rv,
    issues
  })
}

module.exports = rvRoute
