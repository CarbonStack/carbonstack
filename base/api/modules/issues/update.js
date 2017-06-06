const { Issue, IssueCommit } = require('../../../lib/db/models')
const {
  Unauthorized,
  Unprocessable,
  NotFound,
  Forbidden
} = require('../../../lib/errors')
const getSummary = require('../../../lib/markdown/getSummary')
const ws = require('../../../ws')

/**
 * Update issue
 *
 * 1. fetch issue
 * 2. check authority
 * 3. if content changed, create new commit and bind
 * 4. update issue
 * 5. response and broadcast change
 */
async function create (req, res) {
  if (req.user == null) throw new Unauthorized()

  // 1. fetch issue
  const issue = await Issue
    .findById(req.params.issueId)
  if (issue == null) throw new NotFound('Title should not be empty.')

  const issueCommit = await IssueCommit
    .findById(issue.latestCommit)

  // 2. check authority
  if (!req.user._id.equals(issue.writer)) throw new Forbidden('You have no authority to update this issue.')

  // 3. if content changed, create new commit and bind
  req.body.content = String(req.body.content)
  if (issueCommit == null || issueCommit.content !== req.body.content) {
    const issueCommit = await IssueCommit
      .create({
        content: req.body.content,
        writer: req.user._id
      })
    issue.latestCommit = issueCommit._id
  }

  // 4. update issue
  req.body.title = String(req.body.title)
  if (req.body.title.length <= 0) {
    throw new Unprocessable('Title should not be empty.')
  }
  issue.title = req.body.title
  issue.summary = getSummary(req.body.content)
  issue.updatedAt = Date.now()
  issue.save()

  // 5. response and broadcast change
  ws.io.to('group:' + issue.group).emit('issue:update', {
    issue: issue
  })
  ws.io.to('issue:' + issue.issueId).emit('issue:update', {
    issue,
    issueCommit
  })

  res.json({
    issue,
    issueCommit: issueCommit
  })
}

module.exports = create
