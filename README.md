# Landing CRM

API REST para creación y gestión de landing pages de campañas de marketing. Proyecto interno de Genius Agency.

## Contexto de negocio

Genius gestiona campañas para múltiples clientes en simultáneo. Cada campaña suele requerir una o más landing pages: para captar leads, para un evento promocional, para lanzar un producto. Hasta ahora, cada landing requería que un equipo de frontend la construyera desde cero, lo que generaba cuellos de botella en épocas de alta demanda.

**El problema que resuelve este sistema**

Este sistema permite que el equipo de Genius defina templates reutilizables para los tipos de landing más frecuentes. A partir de esos templates, cualquier cuenta puede crear una landing nueva enviando únicamente los datos propios de la campaña (título, descripción, precios, fechas, URLs), sin necesidad de un desarrollador frontend.

**Cliente de referencia: SueñoSimple**

SueñoSimple necesita landings distintas según el momento del año: una para el lanzamiento de su línea Economica Pro, otra para el Hot Sale de mayo, otra para capturar suscriptores al newsletter. Con este sistema, el account manager puede crear cada una en minutos y el equipo de QA puede verificar el resultado antes de publicarla.

## Qué resuelve cada endpoint

| Endpoint | Problema que resuelve en Genius / SueñoSimple |
|----------|-----------------------------------------------|
| `GET /api/templates` | El account manager revisa qué tipos de landing existen antes de crear una nueva campaña. |
| `GET /api/templates/:id` | El equipo consulta qué campos son necesarios para armar la landing de un tipo específico. |
| `GET /api/landings` | Vista general de todas las landings activas y en borrador de todos los clientes. |
| `GET /api/landings/:id` | Consulta el estado y los campos de una landing específica antes de aprobarla. |
| `POST /api/landings` | El equipo crea una nueva landing para SueñoSimple en base a un template existente. |
| `GET /api/landings/:id/preview` | Previsualiza la landing renderizada como HTML antes de publicarla. Permite revisar que el contenido se ve correctamente sin necesitar un frontend separado. |
| `GET /api/landings/:id/leads` | El equipo de ventas consulta los leads captados por una landing para hacer seguimiento. |
| `POST /api/landings/:id/leads` | Simula el envío del formulario de contacto de la landing (usado por QA para verificar la captación). |

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación

```bash
npm install
```

## Ejecución

```bash
# Modo producción
npm start

# Modo desarrollo (con hot reload)
npm run dev
```

La API inicia en `http://localhost:3000`.

## Cómo probar la API sin frontend

Este proyecto expone Swagger UI en `http://localhost:3000/api-docs` (con la aplicación corriendo). Permite ejecutar cualquier endpoint desde el navegador sin instalar herramientas adicionales.

### Pasos para probar un endpoint en Swagger

1. Abrir `http://localhost:3000/api-docs` en el navegador.
2. Hacer clic sobre el endpoint a probar para expandirlo.
3. Hacer clic en **Try it out** (esquina superior derecha del bloque).
4. Completar los campos:
   - **Path param** (como `{id}`): escribir el valor en el campo correspondiente.
   - **Body** (POST): el campo de texto muestra un ejemplo del JSON esperado. Editarlo con los valores reales.
5. Hacer clic en **Execute**. La respuesta aparece debajo con el código HTTP y el JSON retornado.

### Ejemplo: crear una landing para SueñoSimple

1. Expandir `POST /api/landings` y hacer clic en **Try it out**.
2. Ingresar en el body:
```json
{
  "templateId": 3,
  "name": "Captacion leads - Cyber Monday SuenoSimple",
  "client": "SuenoSimple",
  "fields": {
    "title": "Cyber Monday: ofertas de sueño",
    "description": "Registrate y accedé primero a los precios de Cyber Monday.",
    "ctaText": "Quiero acceso anticipado",
    "privacyUrl": "https://suenosimple.com/privacidad"
  }
}
```
3. Hacer clic en **Execute**. La respuesta debe ser `201 Created` con la landing creada.
4. Copiar el `id` de la respuesta y usarlo en `GET /api/landings/{id}/preview` para ver el HTML renderizado.

### Alternativa: Postman

La especificación OpenAPI está disponible en `http://localhost:3000/openapi.json`. Se puede importar directamente en Postman como colección.

## Templates disponibles

La carpeta `templates/` contiene ejemplos HTML renderizados de cada tipo. Abrirlos en el navegador para ver cómo luce visualmente cada template antes de usarlo.

| Archivo | Template | Uso recomendado |
|---------|----------|-----------------|
| `templates/promo-event.html` | `promo-event` (ID 1) | Hot Sale, Black Friday, Cyber Monday |
| `templates/product-launch.html` | `product-launch` (ID 2) | Lanzamiento de producto con precio |
| `templates/lead-capture.html` | `lead-capture` (ID 3) | Captación de leads y newsletter |

## Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/templates` | Listar templates |
| GET | `/api/templates/:id` | Obtener template por ID |
| GET | `/api/landings` | Listar landings |
| GET | `/api/landings/:id` | Obtener landing por ID |
| POST | `/api/landings` | Crear landing desde template |
| GET | `/api/landings/:id/preview` | Previsualizar landing como HTML |
| GET | `/api/landings/:id/leads` | Listar leads de la landing |
| POST | `/api/landings/:id/leads` | Registrar un lead |

Los siguientes endpoints están pendientes de implementación:

| Método | Ruta | Descripción |
|--------|------|-------------|
| PATCH | `/api/landings/:id` | Editar campos de una landing existente |
| DELETE | `/api/landings/:id` | Eliminar una landing |
| GET | `/api/landings?client={nombre}` | Filtrar landings por cliente |
| PATCH | `/api/landings/:id/status` | Cambiar el estado de una landing |
| GET | `/api/landings/summary` | Resumen de leads por landing |

## Datos de prueba

El sistema carga datos en memoria al iniciar. No requiere base de datos ni migraciones.

Landings precargadas:

| ID | Nombre | Cliente | Template | Estado |
|----|--------|---------|----------|--------|
| 1 | Hot Sale 2026 - SuenoSimple | SuenoSimple | promo-event | active |
| 2 | Lanzamiento Economica Pro 2026 | SuenoSimple | product-launch | active |
| 3 | Captacion leads - Newsletter SuenoSimple | SuenoSimple | lead-capture | draft |
| 4 | Black Friday 2026 - TechStore | TechStore | promo-event | draft |

La landing ID 3 tiene 3 leads precargados para facilitar las pruebas.

## Estructura del proyecto

```
src/
├── index.js            Punto de entrada, configuracion de Express y Swagger
├── data/
│   ├── db.js           Datos en memoria (landings, leads)
│   └── templates.js    Definicion de templates con HTML
├── services/
│   ├── templateService.js
│   └── landingService.js
├── routes/
│   ├── templates.js
│   └── landings.js
└── middleware/
    └── errorHandler.js
templates/              Ejemplos HTML renderizados de cada template
```

## Cómo trabajar en este repositorio

**Con cuenta de GitHub:** hacer un fork del repositorio y clonar tu fork para trabajar en tu propia copia. No realizar commits directamente sobre la rama principal del repositorio original.

**Sin cuenta de GitHub:** descargar el proyecto como ZIP desde el botón "Code → Download ZIP" del repositorio y extraerlo localmente.
