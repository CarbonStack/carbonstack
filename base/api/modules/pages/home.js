const { Group } = require('../../../lib/db/models')

async function home (req, res, next) {
  const groups = await Group.find({})

  res.json({
    groups
  })
}

module.exports = home
