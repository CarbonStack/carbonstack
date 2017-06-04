const {
  Group,
  GroupRole,
  User
} = require('../../../../lib/db/models')
const {
  NotFound,
  Unauthorized,
  Forbidden,
  Unprocessable
} = require('../../../../lib/errors')
const ws = require('../../../../ws')

async function update (req, res, next) {
  // Check session
  if (req.session == null) throw new Unauthorized()

  // Check group exists
  const group = await Group.findById(req.params.groupId)
  if (group == null) throw new NotFound()

  // Check user exists
  const isTargetSameToSubject = req.body.userId == null || req.user._id.equals(req.body.userId)
  // Get target user
  const user = isTargetSameToSubject
    ? req.user
    : await User.findById(req.body.userId)
  if (user == null) throw new Unprocessable('Invalid user id.')

  // Who to modify member info
  const subjectRole = await GroupRole
    .findOne({
      user: req.user._id
    })

  // Policy check
  if (isTargetSameToSubject) {
    // Joining task
    if (subjectRole == null) {
      //   1.  Subject: guest, Target: subject, Policy: closed, Condition: Invited (Join as a new member)
      if (subjectRole && group.policies.joinGroup !== 'private') {
        // TODO: Should check the user has invitation
        throw new Forbidden('You need an invitation.')
      }
      //   2. Subject: guest, Target: subject, Policy: anyone (Join as a new member)
      //     No error to throw
    } else {
      //   3. Subject: member, Target: subject (Edit member info except the role attribute)
      // If subject is not admin, role can not be changed
      if (subjectRole.role !== 'admin' && req.body.role != null) {
        throw new Unprocessable('User can not change its own role.')
      }
    }
  } else {
    if (subjectRole.role !== 'admin') {
      throw new Forbidden('Only admin can modify other members.')
    }
  }

  // Create or update role
  let targetRole = isTargetSameToSubject
    ? subjectRole
    : await GroupRole
      .findOne({
        user: user._id,
        group: group._id
      })
  if (targetRole == null) {
    targetRole = new GroupRole({
      user: user._id,
      group: group._id
    })
  }
  // FIXME: we need to update role
  // NOTE: we still don't know which should be needed to update except role
  await targetRole.save()

  // Bind role to group
  group.roles.push(targetRole._id)
  group.markModified('roles')
  // Bind role to user
  user.roles.push(targetRole._id)
  user.markModified('roles')

  // Save group and user concurrently
  await Promise.all([
    group.save(),
    user.save()
  ])

  // Broadcast role update to group
  ws.io.to('group:' + group._id).emit('groupRole:update', {
    role: targetRole
  })

  // Response role update
  res.json({
    user: user,
    role: targetRole
  })
}

module.exports = update
