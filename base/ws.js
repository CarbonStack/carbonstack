const socketIO = require('socket.io')

const ws = {}

const bootstrap = (app) => {
  const server = require('http').createServer(app)
  ws.io = socketIO(server, {
    path: '/ws',
    transports: ['websocket']
  })

  ws.io.on('connection', function (client) {
    client.emit('message', 'connected via ws')

    client.on('join:issue', ({issueId}) => {
      console.log(`${client.id} joined to issue:${issueId}`)
      client.join('issue:' + issueId)
    })
    client.on('leave:issue', ({issueId}) => {
      console.log(`${client.id} left from issue:${issueId}`)
      client.leave('issue:' + issueId)
    })
  })

  return server
}
ws.bootstrap = bootstrap

module.exports = ws
