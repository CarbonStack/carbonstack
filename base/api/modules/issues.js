const { Issue, IssueCommit, Rendezvous } = require('../../lib/db/models')
const { Unauthorized, Unprocessable } = require('../../lib/errors')
const getSummary = require('../../lib/markdown/getSummary')

async function create (req, res) {
  if (req.user == null) throw new Unauthorized()

  req.body.title = String(req.body.title)
  if (req.body.title.length <= 0) {
    throw new Unprocessable('Title should not be empty.')
  }

  req.body.content = String(req.body.content)

  const rv = await Rendezvous
    .findById(req.body.rv)
  if (rv == null) throw new Unprocessable('Invalid rendezvous ID.')

  const issueCommit = await IssueCommit
    .create({
      content: req.body.content,
      writer: req.user._id,
      message: 'Initial Commit'
    })

  rv.latestIssueNumber += 1
  const issue = await Issue
    .create({
      latestCommit: issueCommit._id,
      title: req.body.title,
      summary: getSummary(req.body.content),
      writer: req.user._id,
      number: rv.latestIssueNumber,
      rv: rv._id
    })

  rv.issueMap[rv.latestIssueNumber] = issue._id
  rv.markModified('issueMap')
  await rv.save()

  res.json({
    issue,
    issueCommit: issueCommit
  })
}

module.exports = {
  create
}
