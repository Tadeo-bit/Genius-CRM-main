const auditLog = require('../data/auditLog')

function record({ entityType, entityId, action, user, beforeState, afterState }) {
  const changes = computeChanges(beforeState, afterState)

  const entry = {
    id: auditLog.nextId++,
    timestamp: new Date().toISOString(),
    entityType,
    entityId,
    action,
    user: user || 'unknown',
    beforeState,
    afterState,
    changes
  }

  auditLog.entries.push(entry)
  return entry
}

function getHistory({ entityType, action, dateFrom, dateTo, user, entityId } = {}) {
  return auditLog.entries
    .filter(e => !entityType || e.entityType === entityType)
    .filter(e => !action || e.action === action)
    .filter(e => !entityId || e.entityId === Number(entityId))
    .filter(e => !user || matchesUserFilter(e.user, user))
    .filter(e => !dateFrom || e.timestamp >= dateFrom)
    .filter(e => !dateTo || e.timestamp <= dateTo)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
}

function computeChanges(before, after) {
  if (!before || !after) return {}
  const changes = {}
  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)])

  for (const key of allKeys) {
    const bVal = before[key]
    const aVal = after[key]
    const bStr = JSON.stringify(bVal)
    const aStr = JSON.stringify(aVal)

    if (bStr !== aStr) {
      changes[key] = { before: bVal, after: aVal }
    }
  }
  return changes
}

function matchesUserFilter(storedUser, filter) {
  if (!storedUser) return false
  if (filter === '*') return true

  const [storedIp = '', storedPort = ''] = storedUser.split(':')

  if (filter.includes(':')) {
    const [filterIp = '', filterPort = ''] = filter.split(':')
    if (filterIp && filterPort) return storedIp === filterIp && storedPort === filterPort
    if (filterIp) return storedIp === filterIp
    if (filterPort) return storedPort === filterPort
  }

  return storedIp.includes(filter) || storedPort.includes(filter)
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

module.exports = { record, getHistory, clone }
