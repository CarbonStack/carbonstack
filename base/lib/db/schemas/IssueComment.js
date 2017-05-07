const { Schema } = require('mongoose')

const IssueComment = new Schema({
  content: {
    type: String,
    required: true
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issue: {
    type: Schema.Types.ObjectId,
    ref: 'Issue',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = IssueComment
