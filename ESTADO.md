# Estado del repositorio — Genius-CRM-main

> Reporte de estado generado el 2026-06-21. Para la documentación funcional y de uso, ver [README.md](README.md).

## Resumen

API REST (Landing CRM) para la creación y gestión de landing pages a partir de templates reutilizables, incluyendo la captación de leads. Backend del ecosistema Genius consumido por el Dashboard.

| Campo | Valor |
|---|---|
| Repositorio | `Tadeo-bit/Genius-CRM-main` |
| Stack | Node.js · Express 4 |
| Documentación API | Swagger UI (`/api-docs`) |
| Persistencia | En memoria (sin base de datos) |
| Puerto | `3000` |

## Estado de Git

| Campo | Valor |
|---|---|
| Rama actual | `main` |
| Rama por defecto | `main` |
| Cambios sin commitear | Ninguno (working tree limpio) |
| Sincronización | Al día con `origin/main` |
| Último commit | `b3cfb56 — fix: escape originalPrice placeholder in product template` |

## Estado funcional

**Implementado y operativo:**

- Servidor Express arrancable con `npm start` / `npm run dev`.
- Estructura por capas: `routes` · `services` · `data` · `middleware`.
- 8 endpoints operativos: templates (listar/detalle), landings (listar/detalle/crear), preview HTML y leads (listar/registrar).
- 3 templates HTML disponibles: `product-launch`, `promo-event`, `lead-capture`.
- Datos de prueba precargados (4 landings, leads de ejemplo en la landing ID 3).
- Documentación interactiva con Swagger.

**Pendientes (declarados en el README):**

- `PATCH /api/landings/:id` — editar campos de una landing.
- `DELETE /api/landings/:id` — eliminar una landing.
- `GET /api/landings?client={nombre}` — filtrar por cliente.
- `PATCH /api/landings/:id/status` — cambiar estado.
- `GET /api/landings/summary` — resumen de leads por landing.

**Consideraciones:**

- Los datos viven en memoria y se reinician en cada arranque; sin base de datos.
- Sin autenticación en los endpoints.

## Dependencias con otros repos

- Es consumido por **Genius-Dashboard** (espera esta API en `localhost:3000`).
- También consultado por el panel admin de **Genius-Landings**.

## Cómo ejecutar

```bash
npm install
npm run dev        # desarrollo con hot reload
# o
npm start          # producción
# API:     http://localhost:3000
# Swagger: http://localhost:3000/api-docs
```

**Requisitos:** Node.js 18+ y npm 9+.

## Historial de correcciones

### 2026-06-24 — CRM-F01: endpoint summary, datos de prueba y conexión desde admin

**Cambios realizados**

- Se implementó `GET /api/landings/summary` en `src/routes/landings.js` y `src/services/landingService.js`. Devuelve lista de landings con `leadCount` real por landing. Era el endpoint que el Dashboard necesitaba y devolvía 404.
- Se corrigió `getAllLandings` para que `leadCount` refleje conteo real de leads en lugar de devolver siempre `0`.
- Se agregaron 2 landings hardcodeadas en `src/data/db.js`:
  - ID 5: `Mundial 2026 - SueñoSimple` (status: `draft`)
  - ID 6: `Día de las Madres - SueñoSimple` (status: `draft`)
- `nextLandingId` actualizado a `7`.
- El admin PHP de Genius-Landings ahora hace `POST /api/landings` real al CRM para registrar landings nuevas.

**Verificaciones**

- `GET /api/landings/summary` responde 200.
- `POST /api/landings` desde admin PHP crea landing en memoria con status `draft` y responde 201.
- `GET /api/landings` lista 6 landings desde arranque limpio.
