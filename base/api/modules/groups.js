const path = require('path')
const {
  Group,
  GroupRole
} = require('../../lib/db/models')
const {
  Unauthorized,
  Unprocessable,
  Conflict
} = require('../../lib/errors')
const s3 = require('../../lib/s3')

async function index (req, res, next) {
  const groups = await Group.find({})

  res.json({
    groups
  })
}

async function create (req, res, next) {
  if (req.user == null) throw new Unauthorized()

  let {
    name,
    uniqueName,
    description,
    language,
    profileImage
  } = req.body

  name = name.trim()
  if (typeof name !== 'string' || name.length === 0) {
    throw new Unprocessable('Name field is required')
  }

  uniqueName = uniqueName.trim()
  if (typeof uniqueName !== 'string' || !uniqueName.match(/^[0-9\-a-zA-z]+$/)) {
    throw new Unprocessable('Unique name field must match /^[0-9\\-a-zA-z]+$/.')
  }

  let group
  try {
    group = await Group
      .create({
        name,
        uniqueName,
        description,
        language
      })
  } catch (error) {
    if (error.code === 11000) {
      throw new Conflict('The given unique name is already taken.')
    }
    throw error
  }

  const role = await GroupRole
    .create({
      group: group._id,
      user: req.user._id,
      role: 'admin'
    })

  // Append role to group and user
  group.roles.push(role._id)
  group.markModified('roles')
  req.user.roles.push(role._id)
  req.user.markModified('roles')

  try {
    if (profileImage.length === 0) {
      throw new Error('Invalid path')
    }
    const targetKey = `groups/${uniqueName}/${path.parse(profileImage).base}`
    console.log(targetKey, profileImage)
    await s3
      .copyObject({
        ACL: 'public-read',
        Bucket: process.env.S3_BUCKET_NAME,
        CopySource: process.env.S3_BUCKET_NAME + '/temp/' + profileImage,
        Key: targetKey
      })
      .promise()
    profileImage = `${process.env.BASE_URL}/files/v/${targetKey}`
  } catch (error) {
    console.log(error)
    profileImage = 'https://unpkg.com/@carbonstack/favicon@0.0.1/assets/logo.svg'
  }

  group.photos = [{value: profileImage}]

  await Promise.all([
    group.save(),
    req.user.save()
  ])

  res.json({
    group
  })
}

module.exports = {
  index,
  create
}
