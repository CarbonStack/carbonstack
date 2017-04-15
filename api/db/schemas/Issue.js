const { Schema } = require('mongoose')

const Issue = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  number: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    unique: true
  },
  rendezvous: {
    type: Schema.Types.ObjectId,
    ref: 'Rendezvous',
    required: true
  }
})

module.exports = Issue
