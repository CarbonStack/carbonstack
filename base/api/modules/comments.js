const { Issue, IssueComment } = require('../../lib/db/models')
const { Unauthorized, Unprocessable } = require('../../lib/errors')
const ws = require('../../ws')

async function create (req, res) {
  if (req.user == null) throw new Unauthorized()

  req.body.content = String(req.body.content)
  if (req.body.content.length <= 0) {
    throw new Unprocessable('Content should not be empty.')
  }

  const issue = await Issue
    .findById(req.body.issue)
  if (issue == null) throw new Unprocessable('Invalid issue ID.')

  issue.latestCommentNumber += 1
  const issueComment = await IssueComment
    .create({
      content: req.body.content,
      writer: req.user._id,
      issue: issue._id,
      number: issue.latestCommentNumber
    })

  issue.commentMap[issue.latestCommentNumber] = issueComment._id
  issue.markModified('commentMap')
  await issue.save()

  const normalizedIssueComment = Object.assign({}, issueComment.toJSON(), {
    writer: req.user
  })

  ws.io.to('issue:' + issue._id).emit('issueComment:create', {
    issueComment: normalizedIssueComment
  })

  res.json({
    issueComment: normalizedIssueComment
  })
}

module.exports = {
  create
}
