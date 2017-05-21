const dev = process.env.NODE_ENV !== 'production'

const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('./lib/passport')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))
router.use(cookieParser(process.env.APP_SECRET))

router.use(session({
  secret: process.env.APP_SECRET,
  store: new FileStore({
    path: '/tmp/sessions',
    ttl: 3600 * 24 * 14
  }),
  resave: false,
  saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())

router.use('/api', require('./api/router'))
router.use('/auth', require('./auth/router'))
router.use('/files', require('./files/router'))

router.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
router.use(function (error, req, res, next) {
  console.log(error)
  // set locals, only providing error in development
  res.locals.message = error.message
  res.locals.error = dev ? error : {}

  // render the error page
  res.status(error.status || 500)
  res.json({
    message: error.message
  })
})
module.exports = router
