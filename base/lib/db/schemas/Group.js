const { Schema } = require('mongoose')

const Group = new Schema({
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
  },
  photos: {
    type: [{
      value: String
    }],
    default: []
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'GroupRole'
  }]
})

module.exports = Group
