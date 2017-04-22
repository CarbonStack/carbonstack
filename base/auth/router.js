const express = require('express')
const router = express.Router()
const passport = require('../lib/passport')

// Redirect to oauth request page of Github
router.get('/github', passport.authenticate('github'))

// Authenticate
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('http://localhost:3000')
  }
)

module.exports = router
