const { Schema } = require('mongoose')

const Subscription = new Schema({
  rv: {
    type: Schema.Types.ObjectId,
    ref: 'Rendezvous',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = Subscription
