const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const templateRoutes = require('./routes/templates')
const landingRoutes = require('./routes/landings')
const errorHandler = require('./middleware/errorHandler')

const app = express()
app.use(express.json())

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Landing CRM API',
      version: '1.0.0',
      description: 'API para creación y gestión de landing pages de campañas de marketing. Genius Agency.'
    },
    components: {
      schemas: {
        Template: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'promo-event' },
            description: { type: 'string' },
            requiredFields: { type: 'array', items: { type: 'string' } },
            optionalFields: { type: 'array', items: { type: 'string' } }
          }
        },
        Landing: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            templateId: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Hot Sale 2026 - SuenoSimple' },
            client: { type: 'string', example: 'SuenoSimple' },
            status: { type: 'string', enum: ['draft', 'active', 'inactive'], example: 'active' },
            fields: { type: 'object', additionalProperties: true },
            leadCount: { type: 'integer', example: 3 },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        CreateLandingRequest: {
          type: 'object',
          required: ['templateId', 'name', 'client', 'fields'],
          properties: {
            templateId: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Hot Sale 2026 - SuenoSimple' },
            client: { type: 'string', example: 'SuenoSimple' },
            fields: { type: 'object', additionalProperties: true }
          }
        },
        Lead: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            landingId: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Maria Gomez' },
            email: { type: 'string', format: 'email', example: 'maria@gmail.com' },
            phone: { type: 'string', example: '1134567890' },
            message: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        CreateLeadRequest: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string', example: 'Maria Gomez' },
            email: { type: 'string', format: 'email', example: 'maria@gmail.com' },
            phone: { type: 'string', example: '1134567890', nullable: true },
            message: { type: 'string', nullable: true }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/openapi.json', (req, res) => res.json(swaggerSpec))

app.use('/api/templates', templateRoutes)
app.use('/api/landings', landingRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Landing CRM running on http://localhost:${PORT}`)
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`)
})

module.exports = app
