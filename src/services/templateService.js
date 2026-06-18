const templates = require('../data/templates')

function getAllTemplates() {
  return templates.map(({ html, ...rest }) => rest)
}

function getTemplateById(id) {
  const template = templates.find(t => t.id === Number(id))
  if (!template) {
    const err = new Error(`Template not found: ${id}`)
    err.statusCode = 404
    throw err
  }
  return template
}

module.exports = { getAllTemplates, getTemplateById }
