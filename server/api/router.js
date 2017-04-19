const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.json({
    message: 'wwa'
  })
})

router.get('/me', (req, res, next) => {
  res.json({
    user: req.user
  })
})

module.exports = router
