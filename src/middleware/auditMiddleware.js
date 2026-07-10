const db = require('../data/db')
const auditService = require('../services/auditService')

function resolveUser(req) {
  const forwarded = req.headers['x-forwarded-for']
  let ip = forwarded
    ? forwarded.split(',')[0].trim()
    : (req.ip || req.connection?.remoteAddress || 'unknown')
  if (ip === '::1' || ip === '0:0:0:0:0:0:0:1') ip = '127.0.0.1'
  const port = req.socket?.remotePort || 0
  return `${ip}:${port}`
}

function interceptResponse(res, callback, next) {
  const originalJson = res.json.bind(res)
  res.json = function (body) {
    res.json = originalJson
    try {
      callback(body)
    } catch (e) {
      console.error('Audit log error:', e.message)
    }
    return originalJson(body)
  }
  next()
}

function auditLandings() {
  return function auditMiddleware(req, res, next) {
    const method = req.method
    const path = req.path

    if (!['POST', 'PUT', 'PATCH'].includes(method)) return next()

    const user = resolveUser(req)

    if (method === 'POST' && path === '/') {
      return interceptResponse(res, (body) => {
        if (body && body.id) {
          auditService.record({
            entityType: 'landing',
            entityId: body.id,
            action: 'create',
            user,
            beforeState: null,
            afterState: body
          })
        }
      }, next)
    }

    if (method === 'PATCH' && path.includes('/status')) {
      const id = Number(req.path.split('/')[1])
      const beforeLanding = db.landings.find(l => l.id === id)
      if (!beforeLanding) return next()

      const beforeState = auditService.clone(beforeLanding)

      return interceptResponse(res, (body) => {
        auditService.record({
          entityType: 'landing',
          entityId: id,
          action: 'status_change',
          user,
          beforeState,
          afterState: body
        })
      }, next)
    }

    if (method === 'POST' && path.includes('/leads')) {
      const landingId = Number(req.path.split('/')[1])
      return interceptResponse(res, (body) => {
        if (body && body.id) {
          auditService.record({
            entityType: 'landing',
            entityId: landingId,
            action: 'lead_added',
            user,
            beforeState: null,
            afterState: body
          })
        }
      }, next)
    }

    return next()
  }
}

module.exports = { auditLandings }
