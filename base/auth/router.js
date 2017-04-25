const express = require('express')
const router = express.Router()
const passport = require('../lib/passport')

// Redirect to oauth request page of Github
router.get('/github',
  storeRedirectTo,
  passport.authenticate('github')
)

// Authenticate
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  redirectToOrigin
)

module.exports = router

function storeRedirectTo (req, res, next) {
  storeIfQueryHasRedirectTo(req)
    .then(next)
    .catch(next)
}

function storeIfQueryHasRedirectTo (req) {
  return new Promise((resolve, reject) => {
    if (req.query.redirectTo) {
      req.session.redirectTo = req.query.redirectTo
      return req.session.save(err => {
        if (err) return reject(err)
        resolve()
      })
    } else {
      resolve()
    }
  })
}

function redirectToOrigin (req, res) {
  const redirectTo = typeof req.session.redirectTo === 'string'
    ? req.session.redirectTo
    : process.env.BASE_URL
  req.session.redirectTo = null
  req.session.save(() => {
    res.redirect(redirectTo)
  })
}
