const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
} else {
  require('dotenv').config({
    path: '.env.production'
  })
}

const { Rendezvous } = require('../base/lib/db/models')

const seeds = [
  {
    uniqueName: 'carbonstack',
    name: 'Carbon Stack',
    description: ''
  },
  {
    uniqueName: 'reactkr',
    name: 'React Korea',
    description: ''
  }
]

Promise.all(seeds.map(findOrCreateRV))
  .then(rvs => {
    console.log('%d rvs created', rvs.length)
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

function findOrCreateRV (input) {
  const { uniqueName } = input

  return Rendezvous
    .findOne({
      uniqueName
    })
    .then(rv => {
      if (rv == null) {
        return Rendezvous
          .create(input)
      }
    })
}
