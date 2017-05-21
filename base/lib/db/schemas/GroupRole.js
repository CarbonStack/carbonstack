const { Schema } = require('mongoose')

const GroupRole = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: [
      'admin',
      'moderator',
      'member',
      'outcast'
    ],
    default: 'member',
    required: true
  },
  score: {
    type: Number,
    default: 0
  }
})

module.exports = GroupRole
