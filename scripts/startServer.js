const express = require('express')
const next = require('next')
const router = require('../api/router')

const logger = require('morgan')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.use(logger('dev'))
    if (dev) {
      const httpProxy = require('http-proxy')
      const proxy = httpProxy.createProxyServer()
      server.use('/api', (req, res) => {
        console.log('Redirecting to http://127.0.0.1:3001/' + req.baseUrl)
        proxy.web(req, res, { target: 'http://127.0.0.1:3001' })
      })
    } else {
      server.use('/api', router)
    }

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
