function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500
  res.status(status).json({ error: err.message })
}

module.exports = errorHandler
