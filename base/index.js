const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
} else {
  require('dotenv').config({
    path: '.env.production'
  })
}

const express = require('express')
const app = express()

app.use(require('./rootRouter'))

app.listen(3001, (err) => {
  if (err) throw err
  console.log('API server is on http://127.0.0.1:3001')
})
