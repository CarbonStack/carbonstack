const { Schema } = require('mongoose')

const Rendezvous = new Schema({
  uniqueName: {
    type: String,
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
  issueCount: {
    type: Number,
    default: 0
  }
})

module.exports = Rendezvous
