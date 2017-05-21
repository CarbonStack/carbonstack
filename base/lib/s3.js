const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY
})

module.exports = s3
