const express = require('express')
const router = express.Router()
const pagesRouter = require('./modules/pages/router')
const session = require('./modules/session')
const groups = require('./modules/groups')
const issues = require('./modules/issues')
const comments = require('./modules/comments')
const asyncWrap = require('../lib/asyncWrap')

router.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to Carbonstack API server.'
  })
})

/**
 * Session
 */
router.get('/session', session.show)
router.delete('/session', session.destroy)

/**
 * Page bundle Apis
 */
router.use('/pages', pagesRouter)

/**
 * Data Apis
 */
router.get('/groups', asyncWrap(groups.list))
router.post('/groups', asyncWrap(groups.create))

// Join user to gruop
router.put('/groups/:groupId/roles', asyncWrap(groups.roles.update))
// Revoke user from group
router.delete('/groups/:groupId/roles', asyncWrap(groups.roles.destroy))

router.post('/issues', asyncWrap(issues.create))
router.put('/issues/:issueId', asyncWrap(issues.update))

router.post('/comments', asyncWrap(comments.create))

module.exports = router
