module.exports = {
  webpack: (config, { dev }) => {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
    })
    return config
  }
}
