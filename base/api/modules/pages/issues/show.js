const { Group, Issue, IssueComment } = require('../../../../lib/db/models')
const { NotFound } = require('../../../../lib/errors')

async function issueRoute (req, res, next) {
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

  const commentIds = [...new Array(100)].reduce((ids, v, i) => {
    const commentNumber = issue.latestCommentNumber - i
    if (commentNumber > 0) ids.push(issue.commentMap[commentNumber])
    return ids
  }, [])

  const comments = await IssueComment
    .find({
      _id: {
        $in: commentIds
      }
    })
    .populate('writer')

  res.json({
    issue,
    comments
  })
}

module.exports = issueRoute
