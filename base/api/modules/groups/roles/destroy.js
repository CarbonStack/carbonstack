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

async function destroy (req, res, next) {
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
    // Unless subject is only admin, there should be no error
    if (subjectRole === 'admin') {
      const otherAdmin = await GroupRole
        .findOne({
          group: group._id,
          user: {
            $ne: user._id
          }
        })
      if (otherAdmin == null) throw new Unprocessable('Group must have one admin at least. Transfer ownership or delete team')
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
        user: user._id
      })
  if (targetRole == null) {
    throw new Unprocessable('Target user is not in the group')
  }
  await targetRole.remove()

  // Unbind role to group
  group.roles = group.roles.filter(roleId => !roleId.equals(targetRole._id))
  group.markModified('roles')
  // Unbind role to user
  user.roles = user.roles.filter(roleId => !roleId.equals(targetRole._id))
  user.markModified('roles')

  // Save group and user concurrently
  await Promise.all([
    group.save(),
    user.save()
  ])

  // Broadcast role update to group
  ws.io.to('group:' + group._id).emit('groupRole:destroy', {
    role: targetRole
  })
  ws.io.to('user:' + user._id).emit('groupRole:destroy', {
    role: targetRole
  })

  // Response role update
  res.json({
    role: targetRole
  })
}

module.exports = destroy
