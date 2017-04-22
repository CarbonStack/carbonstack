const { Schema } = require('mongoose')

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    hidden: true
  },
  githubId: {
    type: String,
    required: true
  },
  githubName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String
  }
})

module.exports = User
