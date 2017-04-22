const express = require('express')
const router = express.Router()
const session = require('./routes/session')

router.get('/', (req, res, next) => {
  res.json({
    message: 'wwa'
  })
})

router.get('/session', session.show)
router.delete('/session', session.destroy)

module.exports = router
