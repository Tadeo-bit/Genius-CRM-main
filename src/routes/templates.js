const express = require('express')
const router = express.Router()
const templateService = require('../services/templateService')

/**
 * @swagger
 * /api/templates:
 *   get:
 *     summary: Listar todos los templates disponibles
 *     tags: [Templates]
 *     responses:
 *       200:
 *         description: Lista de templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 */
router.get('/', (req, res, next) => {
  try {
    res.json(templateService.getAllTemplates())
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /api/templates/{id}:
 *   get:
 *     summary: Obtener un template por ID
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del template
 *     responses:
 *       200:
 *         description: Template encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       404:
 *         description: Template no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', (req, res, next) => {
  try {
    const { html, ...template } = templateService.getTemplateById(req.params.id)
    res.json(template)
  } catch (err) {
    next(err)
  }
})

module.exports = router
