module.exports = {
  list: require('./list'),
  create: require('./create'),
  roles: {
    update: require('./roles/update'),
    destroy: require('./roles/destroy')
  }
}
