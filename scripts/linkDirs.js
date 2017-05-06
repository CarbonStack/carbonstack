const fs = require('fs')
const path = require('path')

const moduleMap = [
  'lib',
  'components',
  'base',
  'specs'
]

function link (modulePath) {
  const sourcePath = path.join(__dirname, '..', modulePath)
  const targetPath = path.join(__dirname, '../node_modules', modulePath)
  try {
    // throw if the link doesn't exist yet.
    fs.statSync(targetPath)
  } catch (err) {
    // create link
    fs.symlinkSync(sourcePath, targetPath, 'dir')
  }
}

moduleMap.forEach(link)
