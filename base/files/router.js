const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const path = require('path')
// About sharp http://sharp.dimens.io/en/stable/api-output/#tobuffer
const sharp = require('sharp')
const asyncWrap = require('../lib/asyncWrap')
const moment = require('moment')
const s3 = require('../lib/s3')
const {
  BadRequest
} = require('../lib/errors')

router.use(fileUpload({
  limits: 5 * 1024 * 1024
}))

router.post('/upload-profile-image', asyncWrap(async (req, res) => {
  if (!req.files) throw new BadRequest('No file was uploaded.')

  const file = req.files.file
  const imageBuffer = await sharp(file.data)
    .resize(320, 320)
    .png()
    .toBuffer()

  // YYYY-MM-DD/original-name-DATETIME.png
  const tempPath = `${moment().utcOffset(0).format('YYYY-MM-DD')}/${path.parse(file.name).name}-${Date.now()}.png`

  await s3
    .upload({
      ACL: 'public-read',
      Bucket: process.env.S3_BUCKET_NAME,
      Key: path.join('temp', tempPath),
      Body: imageBuffer,
      ContentType: 'image/png'
    })
    .promise()

  // Create temp key
  res.json({
    tempPath
  })
}))

router.use('/v', (req, res) => {
  res.redirect(`https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com${req.url}`)
})

module.exports = router
