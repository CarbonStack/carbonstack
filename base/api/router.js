const express = require('express')
const router = express.Router()
const session = require('./modules/session')
const pages = require('./modules/pages')
const rendezvous = require('./modules/rendezvous')
const issues = require('./modules/issues')
const comments = require('./modules/comments')
const asyncWrap = require('../lib/asyncWrap')

router.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to Carbonstack API server.'
  })
})

router.get('/session', session.show)
router.delete('/session', session.destroy)

router.get('/pages/home', asyncWrap(pages.home))
router.get('/pages/nouveau', asyncWrap(pages.nouveau))
router.get('/pages/rv/:rvUniqueName', asyncWrap(pages.rv))
router.get('/pages/rv/:rvUniqueName/issues/:issueNumber', asyncWrap(pages.issue))

router.get('/rendezvous', rendezvous.index)

router.post('/issues', asyncWrap(issues.create))

router.post('/comments', asyncWrap(comments.create))

module.exports = router
