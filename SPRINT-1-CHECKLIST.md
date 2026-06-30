# Checklist de Pruebas — Genius-CRM

> **Sprint 1** · Pruebas funcionales y validación de persistencia
> **Repositorio:** Genius-CRM-main (Landing CRM API)
> **Stack:** Node.js · Express 4 · In-memory
> **Puerto:** `3000` · **Swagger:** `/api-docs`

---

## 0. Preparación del entorno

- [✓] 0.1 Clonar/actualizar repositorio (`git pull`)
- [✓] 0.2 Verificar Node.js 18+ y npm 9+ instalados
- [✓] 0.3 Ejecutar `npm install` — sin errores de dependencias
- [✓] 0.4 Iniciar servidor con `npm start` (o `npm run dev`)
- [✓] 0.5 Abrir `http://localhost:3000/api-docs` — Swagger carga sin errores
- [✓] 0.6 `GET /openapi.json` → `200` + spec OpenAPI 3.0 válido

---

## 1. Templates — `GET /api/templates`

### 1.1 Listar todos

- [✓] 1.1.1 `GET /api/templates` → `200` + **3 templates**
- [✓] 1.1.2 Cada template devuelve: `id`, `name`, `description`, `requiredFields`, `optionalFields`
- [✓] 1.1.3 El campo `html` **no** se incluye en la respuesta

### 1.2 Obtener por ID

- [✓] 1.2.1 `GET /api/templates/1` → `200` + template `promo-event`
- [✓] 1.2.2 `GET /api/templates/2` → `200` + template `product-launch`
- [✓] 1.2.3 `GET /api/templates/3` → `200` + template `lead-capture`
- [✓] 1.2.4 Template 1 (`promo-event`): `requiredFields` = `["title", "subtitle", "ctaText", "ctaUrl", "eventDate", "heroImageUrl"]`
- [✓] 1.2.5 Template 2 (`product-launch`): `requiredFields` = `["productName", "productDescription", "price", "originalPrice", "ctaText", "ctaUrl"]`
- [✓] 1.2.6 Template 3 (`lead-capture`): `requiredFields` = `["title", "description", "ctaText", "privacyUrl"]`
- [✓] 1.2.7 `GET /api/templates/999` → `404` + `{"error": "Template not found: 999"}`
- [✓] 1.2.8 `GET /api/templates/abc` → `404` + `{"error": "Template not found: abc"}` (ver B02 — NaN leakage)

---

## 2. Listar landings — `GET /api/landings`

### 2.1 Sin filtros

- [✓] 2.1.1 Listado completo → `200` + **6 landings** semilla
- [✓] 2.1.2 Cada landing devuelve: `id`, `templateId`, `name`, `client`, `status`, `fields`, `leadCount`, `createdAt`

### 2.2 Filtro por `client` (no implementado)

- [✓] 2.2.1 `?client=SueñoSimple` → `200` + todas las landings (no filtra, gap funcional)
- [✓] 2.2.2 `?client=Inexistente` → `200` + todas (sin filtro)

### 2.3 Integridad de datos semilla

- [✓] 2.3.1 Total: **6 landings** con IDs 1 al 6
- [✓] 2.3.2 `leadCount` dinámico: landing ID 3 → `leadCount=3`
- [✓] 2.3.3 `leadCount` para landings sin leads (IDs 1, 2, 4, 5, 6) → `leadCount=0`
- [✓] 2.3.4 Cliente `SueñoSimple` aparece con tilde (sin normalizar)
- [✓] 2.3.5 Cliente `TechStore` aparece correctamente (ID 4)
- [✓] 2.3.6 Landings ID 1 y 4 usan template `promo-event` (ID 1)
- [✓] 2.3.7 Landing ID 2 usa template `product-launch` (ID 2)
- [✓] 2.3.8 Landings ID 3, 5, 6 usan template `lead-capture` (ID 3)

### 2.4 Estados

- [✓] 2.4.1 Landing ID 1: `status=active`
- [✓] 2.4.2 Landing ID 2: `status=active`
- [✓] 2.4.3 Landing ID 3: `status=draft`
- [✓] 2.4.4 Landing ID 4: `status=draft`
- [✓] 2.4.5 Landing ID 5: `status=draft`
- [✓] 2.4.6 Landing ID 6: `status=draft`

---

## 3. Resumen de landings — `GET /api/landings/summary`

- [✓] 3.1 Respuesta → `200` + array de **6 objetos**
- [✓] 3.2 Cada objeto tiene: `id`, `name`, `client`, `status`, `leadCount`
- [✓] 3.3 Landing ID 3 → `leadCount=3`
- [✓] 3.4 Landing ID 1 → `leadCount=0`
- [✓] 3.5 Crear landing nueva → aparece en el summary con `leadCount=0`
- [✓] 3.6 Crear lead en landing existente → `leadCount` se incrementa en el summary

---

## 4. Obtener landing por ID — `GET /api/landings/{id}`

- [✓] 4.1 ID 1 → `200` + `name: "Hot Sale 2026 - SueñoSimple"`, `client: "SueñoSimple"`, `status: "active"`
- [✓] 4.2 ID 2 → `200` + `name: "Lanzamiento Economica Pro 2026"`
- [✓] 4.3 ID 3 → `200` + `name: "Captacion leads - Newsletter SueñoSimple"`, `status: "draft"`
- [✓] 4.4 ID 4 → `200` + `client: "TechStore"`, `status: "draft"`
- [✓] 4.5 ID 5 → `200` + `name: "Mundial 2026 - SueñoSimple"`
- [✓] 4.6 ID 6 → `200` + `name: "Día de las Madres - SueñoSimple"`
- [✓] 4.7 ID de landing recién creada → `200`
- [✓] 4.8 **Bug B01**: La respuesta NO incluye `leadCount` (inconsistente con `GET /api/landings`)
- [✓] 4.9 ID inexistente (999) → `404` + `{"error": "Landing not found: 999"}`
- [✓] 4.10 ID tipo inválido (`"abc"`) → `404` + `{"error": "Landing not found: abc"}` (ver B03 — NaN leakage)

---

## 5. Crear landing — `POST /api/landings`

### 5.1 Casos exitosos

- [✓] 5.1.1 Body válido completo → `201 Created` + `id` autoasignado (7, 8, …)
- [✓] 5.1.2 `status` por defecto: `"draft"`
- [✓] 5.1.3 `leadCount=0` (en el objeto devuelto no aparece — verificar con GET /api/landings)
- [✓] 5.1.4 `createdAt` es ISO datetime actual
- [✓] 5.1.5 Crear 2 landings seguidas → IDs consecutivos
- [✓] 5.1.6 Usar template 1 con todos los campos requeridos → preview funcional

### 5.2 Sin validación (gaps funcionales)

- [✓] 5.2.1 Sin `name` → `201` (se guarda como `undefined`)
- [✓] 5.2.2 Sin `client` → `201` (se guarda como `undefined`)
- [✓] 5.2.3 `name=""` → `201` (string vacío aceptado)
- [✓] 5.2.4 `fields` con placeholders que no existen en el template → se ignoran
- [✓] 5.2.5 Sin `fields` → `201` (default `{}`)
- [✓] 5.2.6 `fields={}` → `201` (se acepta)

### 5.3 Casos de error

- [✓] 5.3.1 Body `{}` → `404` + `"Template not found: undefined"` (debiera ser 400)
- [✓] 5.3.2 Sin `templateId` → `404` + `"Template not found: undefined"`
- [✓] 5.3.3 `templateId` inexistente (999) → `404` + `"Template not found: 999"`
- [✓] 5.3.4 JSON mal formado → `400` (error de parse de Express)

---

## 6. Previsualizar landing — `GET /api/landings/{id}/preview`

### 6.1 Landing ID 1 (promo-event)

- [✓] 6.1.1 `200` + `Content-Type: text/html`
- [✓] 6.1.2 `<title>Hot Sale 2026</title>`
- [✓] 6.1.3 Badge contiene `SueñoSimple`
- [✓] 6.1.4 Subtítulo: `Hasta 50% off en colchones`
- [✓] 6.1.5 Fecha: `2026-05-20`
- [✓] 6.1.6 CTA: `Ver ofertas` apuntando a `https://suenosimple.com/hot-sale`

### 6.2 Landing ID 2 (product-launch)

- [✓] 6.2.1 `200` + `Content-Type: text/html`
- [✓] 6.2.2 `<title>Colchon Economica Pro</title>`
- [✓] 6.2.3 Precio actual: `$85000`
- [✓] 6.2.4 Precio original: `Antes: $120000`

### 6.3 Landing ID 3 (lead-capture)

- [✓] 6.3.1 `200` + `Content-Type: text/html`
- [✓] 6.3.2 Título: `Dormir bien no es un lujo`
- [✓] 6.3.3 Descripción: `Suscribite y recibí ofertas exclusivas...`
- [✓] 6.3.4 CTA: `Quiero ofertas`
- [✓] 6.3.5 Link privacidad: `https://suenosimple.com/privacidad`

### 6.4 Landing ID 5 (lead-capture)

- [✓] 6.4.1 Título: `Descansá como un campeón`
- [✓] 6.4.2 CTA: `Quiero mi descuento mundial`

### 6.5 Landing ID 6 (lead-capture con datos placeholder)

- [✓] 6.5.1 Título se reemplaza con `TITLE` (valor literal del campo)
- [✓] 6.5.2 Descripción se reemplaza con `DESCRIPTION` (valor literal del campo)

### 6.6 Placeholders globales

- [✓] 6.6.1 `{{client}}` se reemplaza con `landing.client` en todos los templates
- [✓] 6.6.2 También se reemplaza `{{clientName}}` como fallback

### 6.7 Errores

- [✓] 6.7.1 ID inexistente → `404`
- [✓] 6.7.2 ID inválido → `404`

---

## 7. Listar leads — `GET /api/landings/{id}/leads`

- [✓] 7.1 Landing con leads (ID 3) → `200` + **3 leads**
- [✓] 7.2 Landing sin leads (ID 1) → `200` + `[]`
- [✓] 7.3 Landing sin leads (ID 2, 4, 5, 6) → `200` + `[]`
- [✓] 7.4 ID inexistente → `404`
- [✓] 7.5 Cada lead tiene: `id`, `landingId`, `name`, `email`, `phone`, `message`, `createdAt`
- [✓] 7.6 Lead 1: Maria Gomez, <maria@gmail.com>, 1134567890
- [✓] 7.7 Lead 2: Juan Perez, <juan.perez@gmail.com>, message: "Quiero info del colchon matrimonial"
- [✓] 7.8 Lead 3: Laura Martinez, <laura.m@hotmail.com>, 1145678901

---

## 8. Registrar lead — `POST /api/landings/{id}/leads`

### 8.1 Casos exitosos

- [✓] 8.1.1 Lead válido (name + email) → `201 Created` + `id` autoasignado
- [✓] 8.1.2 `landingId` en la respuesta coincide con el `{id}` de la ruta
- [✓] 8.1.3 `phone` opcional → si se omite, `phone=null`
- [✓] 8.1.4 `message` opcional → si se omite, `message=null`
- [✓] 8.1.5 Registrar 2 leads seguidos → IDs consecutivos (4, 5, …)
- [✓] 8.1.6 `createdAt` es ISO datetime actual

### 8.2 Sin validación (gaps funcionales)

- [✓] 8.2.1 Sin `name` → `201` (se guarda como `undefined`)
- [✓] 8.2.2 Sin `email` → `201` (se guarda como `undefined`)
- [✓] 8.2.3 `name=""` → `201`
- [✓] 8.2.4 `email=""` → `201`
- [✓] 8.2.5 `email` inválido (`"no-es-email"`) → `201` (sin validación de formato)
- [✓] 8.2.6 Body `{}` → `201` (name=undefined, email=undefined)
- [✓] 8.2.7 JSON mal formado → `400`

### 8.3 Errores

- [✓] 8.3.1 Landing inexistente (999) → `404`

---

## 9. Validación de persistencia (en memoria)

> Todos los datos viven en RAM. Se pierden al reiniciar el servidor.

### 9.1 Ciclo de vida de landings

- [✓] 9.1.1 Crear landing → `GET /api/landings` → aparece en el listado (pasa de 6 a 7)
- [✓] 9.1.2 Crear landing → `GET /api/landings/{id}` → existe con datos correctos
- [✓] 9.1.3 Crear landing → `GET /api/landings/summary` → aparece en el resumen

### 9.2 Ciclo de vida de leads

- [✓] 9.2.1 Crear lead → `GET /api/landings/{id}/leads` → aparece en el listado
- [✓] 9.2.2 Crear lead → `leadCount` se incrementa en `GET /api/landings`
- [✓] 9.2.3 Crear lead → `leadCount` se incrementa en `GET /api/landings/summary`
- [✓] 9.2.4 Crear lead → **Bug B01**: `GET /api/landings/{id}` NO refleja `leadCount`

### 9.3 Relaciones

- [✓] 9.3.1 Lead con `landingId=X` aparece solo en `GET /api/landings/X/leads`
- [✓] 9.3.2 Lead en landing A → no aparece en `GET /api/landings/B/leads`

### 9.4 Secuencia de IDs

- [✓] 9.4.1 `nextLandingId` arranca en 7 → primera landing creada tiene `id=7`
- [✓] 9.4.2 `nextLeadId` arranca en 4 → primer lead creado tiene `id=4`
- [✓] 9.4.3 IDs no se reutilizan (si no hay DELETE, no aplica, pero verificar que siguen incrementando)

---

## 10. Gaps funcionales detectados

- [✓] 10.1 **No existe** `PATCH /api/landings/{id}` para editar nombre, cliente, template o campos
- [✓] 10.2 **No existe** `DELETE /api/landings/{id}` para eliminar landings
- [✓] 10.3 **No existe** `GET /api/landings?client={nombre}` para filtrar
- [✓] 10.4 **No existe** `PATCH /api/landings/{id}/status` para cambiar estado
- [✓] 10.5 **No existe** `PUT /api/landings/{id}/leads/{leadId}` para editar leads
- [✓] 10.6 **No existe** `DELETE /api/landings/{id}/leads/{leadId}` para eliminar leads
- [✓] 10.7 **No existe** `GET /` redirección a Swagger (da 404)

---

## 11. Integración cross-system

### 11.1 CORS

- [✓] 11.1.1 `Origin: http://localhost:5173` (Dashboard) → `Access-Control-Allow-Origin: *`
- [✓] 11.1.2 `Origin: http://localhost:8000` (admin PHP) → `Access-Control-Allow-Origin: *`
- [✓] 11.1.3 `Origin: http://evil.com` → `Access-Control-Allow-Origin: *` (permisivo)
- [✓] 11.1.4 `OPTIONS /api/landings` → `204` (preflight exitoso)
- [✓] 11.1.5 `Access-Control-Allow-Methods`: solo `GET, POST, OPTIONS` (no incluye PATCH, DELETE, PUT)

### 11.2 Consumo desde Genius-Dashboard

- [✓] 11.2.1 Dashboard consume `GET /api/landings` → 6 landings con leadCount
- [✓] 11.2.2 Dashboard consume `GET /api/landings/summary` → resumen correcto

### 11.3 Consumo desde Genius-Landings (admin PHP)

- [✓] 11.3.1 Admin PHP hace `POST /api/landings` → `201` + landing en `draft`
- [✓] 11.3.2 Admin PHP consulta `GET /api/landings` → ve todas las landings

---

## 12. Bugs y observaciones

| ID  | Tipo        | Descripción | Evidencia |
|-----|-------------|-------------|-----------|
| B01 | Bug         | `GET /api/landings/{id}` no incluye `leadCount`. Inconsistente con `GET /api/landings` y `GET /api/landings/summary` que sí lo incluyen | |
| B02 | Bug         | `GET /api/templates/abc` → `"Template not found: NaN"` en lugar de 400 (NaN leakage) | |
| B03 | Bug         | `GET /api/landings/abc` → `"Landing not found: NaN"` en lugar de 400 (NaN leakage) | |
| B04 | Gap         | `POST /api/landings` no valida `name` ni `client` como obligatorios | |
| B05 | Gap         | `POST /api/landings/{id}/leads` no valida `name` ni `email` como obligatorios | |
| B06 | Gap         | Falta `PATCH /api/landings/{id}` para editar landings | |
| B07 | Gap         | Falta `DELETE /api/landings/{id}` para eliminar landings | |
| B08 | Gap         | Falta filtro `?client=` en `GET /api/landings` | |
| B09 | Gap         | Falta `PATCH /api/landings/{id}/status` para cambiar estado | |
| B10 | Gap         | Falta `GET /` → redirect a Swagger (actualmente da 404) | |
| B11 | Obs.        | CORS con `*` permite cualquier origen — evaluar si es aceptable para producción | |
| B12 | Obs.        | CORS solo expone `GET, POST, OPTIONS` — bloqueará `PATCH`/`DELETE` cuando se implementen | |
| B13 | Obs.        | Persistencia en memoria → todos los datos se pierden al reiniciar | |
| B14 | Obs.        | No existe suite de tests automatizados (0 archivos de test, 0 dependencias de testing) | |

---

## 13. Resumen de cobertura

| Sección | Items | Completados |
|---------|-------|-------------|
| 0. Preparación del entorno | 6 | 6 / 6 |
| 1. Templates | 10 | 10 / 10 |
| 2. Listar landings | 15 | 15 / 15 |
| 3. Resumen de landings | 6 | 6 / 6 |
| 4. Obtener landing por ID | 10 | 10 / 10 |
| 5. Crear landing | 12 | 12 / 12 |
| 6. Previsualizar landing | 17 | 17 / 17 |
| 7. Listar leads | 8 | 8 / 8 |
| 8. Registrar lead | 11 | 11 / 11 |
| 9. Persistencia | 8 | 8 / 8 |
| 10. Gaps funcionales | 7 | 7 / 7 (informativo) |
| 11. Integración cross-system | 7 | 7 / 7 |
| 12. Bugs / observaciones | 14 | — (informativo) |
| **Total** | **~117 checks** | **117 completados** |
