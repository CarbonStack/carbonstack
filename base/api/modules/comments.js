const { Issue, IssueComment } = require('../../lib/db/models')
const { Unauthorized, Unprocessable } = require('../../lib/errors')

async function create (req, res) {
  if (req.user == null) throw new Unauthorized()

  req.body.content = String(req.body.content)
  if (req.body.content.length <= 0) {
    throw new Unprocessable('Content should not be empty.')
  }

  const issue = await Issue
    .findById(req.body.issue)
  if (issue == null) throw new Unprocessable('Invalid issue ID.')

  const issueComment = await IssueComment
    .create({
      content: req.body.content,
      writer: req.user._id,
      issue: issue._id
    })

  issue.comments.push(issueComment._id)
  issue.markModified('comments')
  await issue.save()

  res.json({
    issueComment: Object.assign({}, issueComment.toJSON(), {
      writer: req.user
    })
  })
}

module.exports = {
  create
}
