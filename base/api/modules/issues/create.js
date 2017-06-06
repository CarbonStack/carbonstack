const { Issue, IssueCommit, Group } = require('../../../lib/db/models')
const { Unauthorized, Unprocessable } = require('../../../lib/errors')
const getSummary = require('../../../lib/markdown/getSummary')
const ws = require('../../../ws')

async function create (req, res) {
  if (req.user == null) throw new Unauthorized()

  req.body.title = String(req.body.title)
  if (req.body.title.length <= 0) {
    throw new Unprocessable('Title should not be empty.')
  }

  req.body.content = String(req.body.content)

  const group = await Group
    .findById(req.body.group)
  if (group == null) throw new Unprocessable('Invalid rendezvous ID.')

  const issueCommit = await IssueCommit
    .create({
      content: req.body.content,
      writer: req.user._id
    })

  group.latestIssueNumber += 1
  const issue = await Issue
    .create({
      latestCommit: issueCommit._id,
      title: req.body.title,
      summary: getSummary(req.body.content),
      writer: req.user._id,
      number: group.latestIssueNumber,
      group: group._id
    })

  group.issueMap[group.latestIssueNumber] = issue._id
  group.markModified('issueMap')
  await group.save()

  ws.io.to('group:' + group._id).emit('issue:create', {
    issue: issue
  })

  res.json({
    issue,
    issueCommit: issueCommit
  })
}

module.exports = create
