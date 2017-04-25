function show (req, res, next) {
  res.json({
    user: req.user
  })
}

function destroy (req, res, next) {
  req.logout()
  res.json({
    message: 'OK'
  })
}

module.exports = {
  show,
  destroy
}
