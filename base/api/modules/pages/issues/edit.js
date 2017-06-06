const { Group, Issue } = require('../../../../lib/db/models')
const {
  NotFound,
  Unauthorized,
  Forbidden
} = require('../../../../lib/errors')

async function issueRoute (req, res, next) {
  if (req.user == null) throw new Unauthorized()

  const {
    groupUniqueName,
    issueNumber
  } = req.query

  const group = await Group
    .findOne({
      uniqueName: groupUniqueName
    })
  if (group == null) throw new NotFound()

  const issue = await Issue
    .findById(group.issueMap[issueNumber])
    .populate('writer')
    .populate('latestCommit')
  if (issue == null) throw new NotFound()

  // Check edit authority
  // If user is the writer
  // FIXME: after pr implemented, we don't have to throw this
  if (!req.user._id.equals(issue.writer._id)) throw new Forbidden()

  res.json({
    issue,
    group
  })
}

module.exports = issueRoute
