const connection = require('./connection')

const UserSchema = require('./schemas/User')
const IssueSchema = require('./schemas/Issue')
const IssueCommitSchema = require('./schemas/IssueCommit')
const IssueCommentSchema = require('./schemas/IssueComment')
const GroupSchema = require('./schemas/Group')
const GroupRoleSchema = require('./schemas/GroupRole')

module.exports = {
  User: connection.model('User', UserSchema),
  Group: connection.model('Group', GroupSchema),
  GroupRole: connection.model('GroupRole', GroupRoleSchema),
  Issue: connection.model('Issue', IssueSchema),
  IssueCommit: connection.model('IssueCommit', IssueCommitSchema),
  IssueComment: connection.model('IssueComment', IssueCommentSchema)
}
