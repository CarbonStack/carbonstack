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

const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const logger = require('morgan')

nextApp.prepare()
  .then(() => {
    const expressApp = express()
    let server = expressApp
    const logTarget = dev
      ? /^(?!\/_next\/on-demand-entries-ping).+/
      : '*'
    expressApp.use(logTarget, logger('dev'))

    if (!dev) {
      const rootRouter = require('../base/rootRouter')
      expressApp.all(/\/api|\/auth|\/files/, (req, res, next) => {
        req.url = req.baseUrl + req.url
        req.path = req.baseUrl + req.path
        req.baseUrl = '/'
        next()
      }, rootRouter)

      const ws = require('../base/ws')

      server = ws.bootstrap(expressApp)
    } else {
      const proxy = require('http-proxy-middleware')
      expressApp.use('/api', proxy('http://127.0.0.1:3001'))
      expressApp.use('/auth', proxy('http://127.0.0.1:3001'))
      expressApp.use('/files', proxy('http://127.0.0.1:3001'))
    }

    expressApp.get('/g', (req, res) => {
      return res.redirect('/')
    })
    expressApp.get('/groups/new', (req, res) => {
      nextApp.render(req, res, '/groups/new', Object.assign(req.params, req.query))
    })
    expressApp.get('/g/:groupUniqueName', (req, res) => {
      nextApp.render(req, res, '/groups/show', Object.assign(req.params, req.query))
    })
    expressApp.get('/g/:groupUniqueName/new', (req, res) => {
      nextApp.render(req, res, '/issues/new', Object.assign(req.params, req.query))
    })
    expressApp.get('/g/:groupUniqueName/:issueNumber', (req, res) => {
      nextApp.render(req, res, '/issues/show', Object.assign(req.params, req.query))
    })
    expressApp.get('/g/:groupUniqueName/:issueNumber/edit', (req, res) => {
      nextApp.render(req, res, '/issues/edit', Object.assign(req.params, req.query))
    })

    expressApp.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://127.0.0.1:3000')
    })
  })
