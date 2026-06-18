const express = require('express')
const router = express.Router()
const landingService = require('../services/landingService')

/**
 * @swagger
 * /api/landings:
 *   get:
 *     summary: Listar todas las landing pages
 *     tags: [Landings]
 *     responses:
 *       200:
 *         description: Lista de landings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Landing'
 */
router.get('/', (req, res, next) => {
  try {
    res.json(landingService.getAllLandings())
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /api/landings/{id}:
 *   get:
 *     summary: Obtener una landing por ID
 *     tags: [Landings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Landing encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Landing'
 *       404:
 *         description: Landing no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', (req, res, next) => {
  try {
    res.json(landingService.getLandingById(req.params.id))
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /api/landings:
 *   post:
 *     summary: Crear una landing page desde un template
 *     tags: [Landings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLandingRequest'
 *           example:
 *             templateId: 1
 *             name: "Hot Sale 2026 - SuenoSimple"
 *             client: "SuenoSimple"
 *             fields:
 *               title: "Hot Sale 2026"
 *               subtitle: "Hasta 50% off en colchones"
 *               ctaText: "Ver ofertas"
 *               ctaUrl: "https://suenosimple.com/hot-sale"
 *               eventDate: "2026-05-20"
 *               heroImageUrl: "https://via.placeholder.com/1200x400"
 *     responses:
 *       201:
 *         description: Landing creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Landing'
 *       404:
 *         description: Template no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', (req, res, next) => {
  try {
    const landing = landingService.createLanding(req.body)
    res.status(201).json(landing)
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /api/landings/{id}/preview:
 *   get:
 *     summary: Renderizar la landing como HTML
 *     description: Retorna el HTML generado de la landing con los campos del cliente aplicados. Util para previsualizar antes de publicar.
 *     tags: [Landings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: HTML renderizado
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       404:
 *         description: Landing no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id/preview', (req, res, next) => {
  try {
    const html = landingService.getLandingPreview(req.params.id)
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /api/landings/{id}/leads:
 *   get:
 *     summary: Listar leads captados por la landing
 *     tags: [Landings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lead'
 *       404:
 *         description: Landing no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id/leads', (req, res, next) => {
  try {
    res.json(landingService.getLeadsByLanding(req.params.id))
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /api/landings/{id}/leads:
 *   post:
 *     summary: Registrar un lead en la landing
 *     description: Se usa para simular el envío del formulario de contacto de la landing.
 *     tags: [Landings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLeadRequest'
 *           example:
 *             name: "Maria Gomez"
 *             email: "maria@gmail.com"
 *             phone: "1134567890"
 *             message: null
 *     responses:
 *       201:
 *         description: Lead registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       404:
 *         description: Landing no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:id/leads', (req, res, next) => {
  try {
    const lead = landingService.createLead(req.params.id, req.body)
    res.status(201).json(lead)
  } catch (err) {
    next(err)
  }
})

module.exports = router
