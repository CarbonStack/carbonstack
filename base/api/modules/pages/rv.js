const { Rendezvous, Issue } = require('../../../lib/db/models')
const { NotFound } = require('../../../lib/errors')

async function rvRoute (req, res, next) {
  const rv = await Rendezvous
    .findOne({
      uniqueName: req.params.rvUniqueName
    })
  if (rv == null) throw new NotFound()

  // Make Ids array from issueMap
  const issueIds = [...new Array(100)]
    .reduce((ids, v, i) => {
      const issueNumber = rv.latestIssueNumber - i
      if (issueNumber > 0) ids.push(rv.issueMap[issueNumber])
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
    rv,
    issues
  })
}

module.exports = rvRoute
