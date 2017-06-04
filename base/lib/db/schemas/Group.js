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
  }],
  policies: {
    type: {
      joinGroup: {
        type: String,
        enum: [
          'public',
          'private'
        ],
        default: 'public',
        required: true
      },
      inviteGroup: {
        type: String,
        enum: [
          'member',
          'moderator',
          'admin'
        ],
        default: 'member',
        required: true
      },
      readIssue: {
        type: String,
        enum: [
          'guest',
          'member',
          'moderator',
          'admin'
        ],
        default: 'guest',
        required: true
      },
      writeIssue: {
        type: String,
        enum: [
          'guest',
          'member',
          'moderator',
          'admin'
        ],
        default: 'member',
        required: true
      },
      deleteIssue: {
        type: String,
        enum: [
          'member',
          'moderator',
          'admin'
        ],
        default: 'moderator',
        required: true
      },
      writeComment: {
        type: String,
        enum: [
          'guest',
          'member',
          'moderator',
          'admin'
        ],
        default: 'guest',
        required: true
      },
      editComment: {
        type: String,
        enum: [
          'guest',
          'member',
          'moderator',
          'admin'
        ],
        default: 'moderator',
        required: true
      },
      deleteComment: {
        type: String,
        enum: [
          'member',
          'moderator',
          'admin'
        ],
        default: 'moderator',
        required: true
      }
    }
  }
})

module.exports = Group
