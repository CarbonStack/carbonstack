const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))
router.use(cookieParser())
router.use((req, res, next) => {
  console.log(req.originalUrl, 'hit api1')
  next()
})
router.get('/', (req, res, next) => {
  console.log('hit api root')
  res.json('hi2')
})

router.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
router.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json(err)
})

module.exports = router
