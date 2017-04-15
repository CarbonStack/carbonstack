const { Schema } = require('mongoose')

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  github: {
  }
})

module.exports = User
