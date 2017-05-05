const { Schema } = require('mongoose')

const Rendezvous = new Schema({
  uniqueName: {
    type: String,
    unique: true,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  issueMap: {
    type: Schema.Types.Mixed,
    default: {}
  },
  latestIssueNumber: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    default: 0
  }
})

module.exports = Rendezvous
