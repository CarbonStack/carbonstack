const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
} else {
  require('dotenv').config({
    path: '.env.production'
  })
}

// DO NOT EXPOSE SECRET STUFF
const keys = [
  'WS_URL',
  'BASE_URL'
]

const env = keys.reduce((env, key) => {
  env['process.env.' + key] = process.env[key]
  return env
}, {})

module.exports = env
