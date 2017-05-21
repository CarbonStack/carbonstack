const express = require('express')
const router = express.Router()
const asyncWrap = require('../../../lib/asyncWrap')

router.get('/', asyncWrap(require('./home')))
router.get('/new-group', asyncWrap(require('./newGroup')))
router.get('/group', asyncWrap(require('./group')))
router.get('/group/:groupUniqueName/issues/:issueNumber', asyncWrap(require('./issue')))

module.exports = router
