const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
}

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('./lib/passport')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser(process.env.APP_SECRET))

app.use(session({
  secret: process.env.APP_SECRET,
  store: new FileStore(),
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', require('./api/router'))
app.use('/auth', require('./auth/router'))

app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  console.log(err)
  res.locals.error = dev ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json(err)
})

app.listen(3001, (err) => {
  if (err) throw err
  console.log('API server is on http://127.0.0.1:3001')
})
