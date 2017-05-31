const { Unauthorized } = require('../../../../lib/errors')
const { Group } = require('../../../../lib/db/models')
const { NotFound } = require('../../../../lib/errors')

async function newIssueRoute (req, res, next) {
  if (req.user == null) throw new Unauthorized()

  const group = await Group
    .findOne({
      uniqueName: req.query.groupUniqueName
    })
  if (group == null) throw new NotFound()

  res.json({
    group
  })
}

module.exports = newIssueRoute
