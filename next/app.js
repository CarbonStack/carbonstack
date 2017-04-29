const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
} else {
  require('dotenv').config({
    path: '.env.production'
  })
}

const express = require('express')
const next = require('next')

const app = next({ dev })
const handle = app.getRequestHandler()
const proxy = require('http-proxy-middleware')
const logger = require('morgan')

app.prepare()
  .then(() => {
    const server = express()

    const logTarget = dev
      ? /^(?!\/_next\/on-demand-entries-ping).+/
      : '*'
    server.use(logTarget, logger('dev'))

    server.use('/api', proxy('http://127.0.0.1:3001'))
    server.use('/auth', proxy('http://127.0.0.1:3001'))
    server.use('/ws', proxy('http://127.0.0.1:3001'))

    server.get('/rv', (req, res) => {
      return res.redirect('/')
    })
    server.get('/rv/:rvUniqueName', (req, res) => {
      app.render(req, res, '/rv', {
        rvUniqueName: req.params.rvUniqueName
      })
    })
    server.get('/rv/:rvUniqueName/:issueNumber', (req, res) => {
      app.render(req, res, '/issue', {
        rvUniqueName: req.params.rvUniqueName,
        issueNumber: req.params.issueNumber
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://127.0.0.1:3000')
    })
  })
