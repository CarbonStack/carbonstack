const { Schema } = require('mongoose')

const Issue = new Schema({
  title: {
    type: String,
    required: true
  },
  latestCommit: {
    type: Schema.Types.ObjectId,
    ref: 'IssueCommit'
  },
  summary: {
    type: String
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contributors: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  number: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  rv: {
    type: Schema.Types.ObjectId,
    ref: 'Rendezvous',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'IssueComment'
    }],
    default: []
  }
})

module.exports = Issue
