const { Rendezvous, Issue } = require('../../../lib/db/models')
const { NotFound } = require('../../../lib/errors')

async function issueRoute (req, res, next) {
  const rv = await Rendezvous
    .findOne({
      uniqueName: req.params.rvUniqueName
    })
  if (rv == null) throw new NotFound()

  const issue = await Issue
    .findById(rv.issueMap[req.params.issueNumber])
    .populate('writer')
    .populate('latestCommit')
    .populate({
      path: 'comments',
      populate: {
        path: 'writer'
      }
    })
  if (issue == null) throw new NotFound()

  res.json({
    issue
  })
}

module.exports = issueRoute
