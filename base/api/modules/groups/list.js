const {
  Group
} = require('../../../lib/db/models')

async function list (req, res, next) {
  const groups = await Group.find({})

  res.json({
    groups
  })
}

module.exports = list
