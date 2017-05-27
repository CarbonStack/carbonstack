function show (req, res, next) {
  res.json({
    user: req.user
  })
}

function destroy (req, res, next) {
  req.logout()
  req.session.destroy(error => {
    if (error != null) throw error
    res.json({
      message: 'OK'
    })
  })
}

module.exports = {
  show,
  destroy
}
