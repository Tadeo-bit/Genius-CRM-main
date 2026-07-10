const express = require('express')
const router = express.Router()
const auditService = require('../services/auditService')

/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: Obtener historial de cambios
 *     tags: [History]
 *     parameters:
 *       - in: query
 *         name: entityType
 *         schema:
 *           type: string
 *           enum: [campaign, landing]
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *           enum: [create, update, status_change, expense_added, lead_added]
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *       - in: query
 *         name: entityId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de entradas de historial
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/', (req, res) => {
  const history = auditService.getHistory(req.query)
  res.json(history)
})

module.exports = router
