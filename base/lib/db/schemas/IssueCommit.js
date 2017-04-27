const { Schema } = require('mongoose')

const IssueCommit = new Schema({
  content: {
    type: String,
    default: ''
  },
  message: {
    type: String
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
  creatdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = IssueCommit
