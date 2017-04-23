const connection = require('./connection')

const UserSchema = require('./schemas/User')
const IssueSchema = require('./schemas/Issue')
const CommentSchema = require('./schemas/Comment')
const RendezvousSchema = require('./schemas/Rendezvous')
const SubscriptionSchema = require('./schemas/Subscription')

module.exports = {
  User: connection.model('User', UserSchema),
  Rendezvous: connection.model('Rendezvous', RendezvousSchema),
  Issue: connection.model('Issue', IssueSchema),
  Comment: connection.model('Comment', CommentSchema),
  Subscription: connection.model('Subscription', SubscriptionSchema)
}
