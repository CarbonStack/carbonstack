const { Schema } = require('mongoose')

const IssueCommit = new Schema({
  content: {
    type: String,
    default: ''
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  previous: {
    type: Schema.Types.ObjectId,
    ref: 'IssueCommit'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = IssueCommit
