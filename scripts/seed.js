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
    language: 'any',
    description: 'Give your opinion to Carbon Stack!'
  },
  {
    uniqueName: 'reactkr',
    name: 'React Korea',
    language: 'kor',
    description: 'React Korea Usergroup'
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
      rv.set(input)

      return rv.save()
    })
}
