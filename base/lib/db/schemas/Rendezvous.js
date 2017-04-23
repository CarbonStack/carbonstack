const { Schema } = require('mongoose')

const Rendezvous = new Schema({
  uniqueName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})

module.exports = Rendezvous
