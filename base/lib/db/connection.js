const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const connectionURI = process.env.DB_URL

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
})

module.exports = connection
