const { Issue, IssueCommit, Rendezvous } = require('../../lib/db/models')
const { Unauthorized, Unprocessable } = require('../../lib/errors')

function create (req, res, next) {
  if (req.user == null) return next(new Unauthorized())

  Promise
    .resolve({
      user: req.user,
      params: req.body
    })
    .then(validateParams)
    .then(createIssueCommit)
    .then(createIssue)
    .then(data => {
      res.json({
        issue: data.issue,
        issueCommit: data.issueCommit
      })
    })
    .catch(next)
}

module.exports = {
  create
}

function validateParams (data) {
  const { params } = data
  params.title = String(params.title)
  if (params.title.length <= 0) {
    throw new Unprocessable('Title should not be empty.')
  }
  params.content = String(params.content)
  return Rendezvous
    .findById(params.rv)
    .then(rv => {
      if (rv == null) throw new Unprocessable('Invalid rendezvous ID.')
      data.rv = rv
      return data
    })
}

function createIssueCommit (data) {
  console.log('commit')
  const { params, user } = data
  return IssueCommit
    .create({
      content: params.content,
      writer: user._id,
      message: 'Initial Commit'
    })
    .then(issueCommit => {
      data.issueCommit = issueCommit
      return data
    })
}

function createIssue (data) {
  console.log('issue')
  const { params, user, rv, issueCommit } = data
  return Issue
    .create({
      latestCommit: issueCommit._id,
      title: params.title,
      writer: user._id,
      number: rv.issueCount + 1,
      rv: rv._id
    })
    .then(issue => {
      data.issue = issue
      rv.issueCount += 1
      return rv.save()
    })
    .then(() => {
      return data
    })
}
