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
| Rama actual | `dev` |
| Rama por defecto | `main` |
| Cambios sin commitear | Ninguno (working tree limpio) |
| Sincronización | Al día con `origin/dev` |
| Último commit | `d6ecece — fix(crm): reemplaza {{client}} en preview de landings` |

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

---

### 2026-06-25 — Fix: placeholder `{{client}}` no reemplazado en preview

**Problema detectado**

- `GET /api/landings/{id}/preview` devolvía el HTML del template con el literal `{{client}}` sin reemplazar. Solo se reemplazaba `{{clientName}}`.

**Cambios realizados**

- `src/services/landingService.js`, función `getLandingPreview`:
  - Se agregó `html = html.replace(/\{\{client\}\}/g, landing.client || '')`.

**Verificaciones**

- `curl http://localhost:3000/api/landings/1/preview` devuelve `SueñoSimple` en lugar de `{{client}}`.

---

### 2026-06-25 — Verificación de endpoints de leads

**Endpoints verificados operativos:**

- `GET /api/landings/{id}/leads` → devuelve array de leads de la landing (vacío si no hay).
- `POST /api/landings/{id}/leads` → registra un lead con campos `name`, `email`, `phone`, `message`; devuelve 201 con el objeto creado.
- `GET /api/landings/999/leads` → devuelve 404 `"Landing not found: 999"` correctamente.

**Estado funcional actual**

- 8 endpoints operativos: `GET /landings`, `GET /landings/summary`, `GET /landings/:id`, `POST /landings`, `GET /landings/:id/preview`, `GET /landings/:id/leads`, `POST /landings/:id/leads`, `GET /templates`.
- 6 landings de prueba precargadas, `nextLandingId = 7`.
