const express = require('express')

const router = require('../api/router')

const app = express()

app.use('/', router)

app.listen(3001, (err) => {
  if (err) throw err
  console.log('> Proxy API server on http://localhost:3001')
})
