const express = require('express')
const router = express.Router()
const asyncWrap = require('../../../lib/asyncWrap')

router.get('/', asyncWrap(require('./home')))
router.get('/groups/new', asyncWrap(require('./groups/new')))
router.get('/groups/show', asyncWrap(require('./groups/show')))
router.get('/issues/new', asyncWrap(require('./issues/new')))
router.get('/issues/show', asyncWrap(require('./issues/show')))
router.get('/issues/edit', asyncWrap(require('./issues/edit')))

module.exports = router
