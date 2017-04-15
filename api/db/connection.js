const mongoose = require('mongoose')

const connectionURI = process.env.connection_URL

const connection = mongoose.createConnection(connectionURI)

connection.on('connecting', function () {
  console.log('connecting to Mongoconnection...')
})

connection.on('error', function (error) {
  console.error('Error in Mongoconnection connection: ' + error)
  mongoose.disconnect()
})
connection.on('connected', function () {
  console.log('Mongoconnection connected!')
})
connection.once('open', function () {
  console.log('Mongoconnection connection opened!')
})
connection.on('reconnected', function () {
  console.log('Mongoconnection reconnected!')
})
connection.on('disconnected', function () {
  console.log('Mongoconnection disconnected!')
  connect()
})

function connect () {
  mongoose.connect(connectionURI, {
    server: {auto_reconnect: true}
  })
}

connect()

module.exports = connection
