const express = require('express')
const router = express.Router()
const asyncWrap = require('../../../lib/asyncWrap')

router.get('/', asyncWrap(require('./home')))
router.get('/groups/new', asyncWrap(require('./newGroup')))
router.get('/issues/new', asyncWrap(require('./newIssue')))
router.get('/groups/show', asyncWrap(require('./group')))
router.get('/issues/show', asyncWrap(require('./issue')))

module.exports = router
