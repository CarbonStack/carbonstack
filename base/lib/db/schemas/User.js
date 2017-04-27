const { Schema } = require('mongoose')

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  emails: {
    type: [{
      value: String
    }],
    hidden: true,
    required: true
  },
  githubId: {
    type: String,
    required: true
  },
  githubName: {
    type: String,
    required: true
  },
  photos: [{
    value: String
  }],
  experience: {
    type: Number,
    default: 0
  }
})

module.exports = User
