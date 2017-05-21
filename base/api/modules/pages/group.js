const { Group, Issue } = require('../../../lib/db/models')
const { NotFound } = require('../../../lib/errors')

async function groupRoute (req, res, next) {
  const group = await Group
    .findOne({
      uniqueName: req.query.groupUniqueName
    })
  if (group == null) throw new NotFound()

  // Make Ids array from issueMap
  const issueIds = [...new Array(100)]
    .reduce((ids, v, i) => {
      const issueNumber = group.latestIssueNumber - i
      if (issueNumber > 0) ids.push(group.issueMap[issueNumber])
      return ids
    }, [])

  const issues = await Issue
    .find({
      _id: {
        $in: issueIds
      }
    })
    .sort({number: -1})
    .populate('writer')

  res.json({
    group,
    issues
  })
}

module.exports = groupRoute
