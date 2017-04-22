const connection = require('./connection')

const UserSchema = require('./schemas/User')
const IssueSchema = require('./schemas/Issue')
const CommentSchema = require('./schemas/Comment')
const Rendezvous = require('./schemas/Rendezvous')

module.exports = {
  User: connection.model('User', UserSchema),
  Rendezvous: connection.model('Rendezvous', Rendezvous),
  Issue: connection.model('Issue', IssueSchema),
  Comment: connection.model('Comment', CommentSchema)
}
