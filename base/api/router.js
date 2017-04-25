const express = require('express')
const router = express.Router()
const session = require('./modules/session')
const rendezvous = require('./modules/rendezvous')
const pages = require('./modules/pages')

router.get('/', (req, res, next) => {
  res.json({
    message: 'wwa'
  })
})

router.get('/session', session.show)
router.delete('/session', session.destroy)

router.get('/rendezvous', rendezvous.index)

router.get('/pages/nouveau', pages.nouveau)

module.exports = router
