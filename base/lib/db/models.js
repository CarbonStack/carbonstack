const connection = require('./connection')

const UserSchema = require('./schemas/User')
const IssueSchema = require('./schemas/Issue')
const IssueCommitSchema = require('./schemas/IssueCommit')
const IssueCommentSchema = require('./schemas/IssueComment')
const RendezvousSchema = require('./schemas/Rendezvous')
const SubscriptionSchema = require('./schemas/Subscription')

module.exports = {
  User: connection.model('User', UserSchema),
  Rendezvous: connection.model('Rendezvous', RendezvousSchema),
  Issue: connection.model('Issue', IssueSchema),
  IssueCommit: connection.model('IssueCommit', IssueCommitSchema),
  IssueComment: connection.model('IssueComment', IssueCommentSchema),
  Subscription: connection.model('Subscription', SubscriptionSchema)
}
