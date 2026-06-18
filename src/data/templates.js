const promoEventHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .hero {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      display: flex; align-items: center; justify-content: center;
      text-align: center; padding: 40px 20px;
    }
    .badge {
      display: inline-block; background: #e94560; color: #fff;
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; padding: 6px 16px; border-radius: 20px; margin-bottom: 24px;
    }
    h1 { font-size: 3.5rem; font-weight: 900; color: #fff; letter-spacing: -0.02em; margin-bottom: 16px; }
    h2 { font-size: 1.4rem; color: #94a3b8; font-weight: 400; margin-bottom: 20px; }
    .date { font-size: 0.9rem; color: #64748b; margin-bottom: 40px; letter-spacing: 0.05em; }
    .cta {
      display: inline-block; background: #e94560; color: #fff;
      font-size: 1.1rem; font-weight: 700; text-decoration: none;
      padding: 18px 48px; border-radius: 8px;
    }
  </style>
</head>
<body>
  <section class="hero">
    <div>
      <span class="badge">{{client}}</span>
      <h1>{{title}}</h1>
      <h2>{{subtitle}}</h2>
      <p class="date">Hasta el {{eventDate}}</p>
      <a href="{{ctaUrl}}" class="cta">{{ctaText}}</a>
    </div>
  </section>
</body>
</html>`

const productLaunchHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{productName}}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; padding: 40px 20px;
    }
    .card {
      background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      max-width: 480px; width: 100%; padding: 48px 40px; text-align: center;
    }
    .client-name { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px; }
    h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin-bottom: 16px; }
    .description { font-size: 1rem; color: #475569; line-height: 1.6; margin-bottom: 32px; }
    .pricing { margin-bottom: 36px; }
    .original-price { font-size: 1rem; color: #94a3b8; text-decoration: line-through; margin-bottom: 6px; }
    .current-price { font-size: 2.5rem; font-weight: 900; color: #0f172a; }
    .currency { font-size: 1.2rem; vertical-align: top; margin-top: 6px; display: inline-block; }
    .cta {
      display: block; background: #0f172a; color: #fff;
      font-size: 1rem; font-weight: 700; text-decoration: none;
      padding: 16px 32px; border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="card">
    <p class="client-name">{{client}}</p>
    <h1>{{productName}}</h1>
    <p class="description">{{productDescription}}</p>
    <div class="pricing">
      <p class="original-price">Antes: ${{originalPrice}}</p>
      <p class="current-price"><span class="currency">$</span>{{price}}</p>
    </div>
    <a href="{{ctaUrl}}" class="cta">{{ctaText}}</a>
  </div>
</body>
</html>`

const leadCaptureHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 100%);
      min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px;
    }
    .wrapper { max-width: 520px; width: 100%; }
    .client-name { font-size: 0.75rem; font-weight: 700; color: #0284c7; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
    h1 { font-size: 2.2rem; font-weight: 800; color: #0c4a6e; margin-bottom: 16px; line-height: 1.2; }
    .description { font-size: 1rem; color: #075985; line-height: 1.6; margin-bottom: 36px; }
    .form-card { background: #fff; border-radius: 12px; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 32px; }
    .field { margin-bottom: 18px; }
    label { display: block; font-size: 0.82rem; font-weight: 600; color: #334155; margin-bottom: 6px; }
    input, textarea {
      width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 6px;
      font-size: 0.95rem; color: #0f172a; outline: none;
    }
    textarea { resize: vertical; min-height: 80px; }
    .submit {
      width: 100%; background: #0284c7; color: #fff;
      font-size: 1rem; font-weight: 700; border: none; border-radius: 8px;
      padding: 14px; cursor: pointer; margin-top: 8px;
    }
    .privacy { text-align: center; font-size: 0.75rem; color: #94a3b8; margin-top: 16px; }
    .privacy a { color: #0284c7; }
  </style>
</head>
<body>
  <div class="wrapper">
    <p class="client-name">{{client}}</p>
    <h1>{{title}}</h1>
    <p class="description">{{description}}</p>
    <div class="form-card">
      <div class="field"><label>Nombre</label><input type="text" placeholder="Tu nombre completo"></div>
      <div class="field"><label>Email</label><input type="email" placeholder="tu@email.com"></div>
      <div class="field"><label>Teléfono (opcional)</label><input type="tel" placeholder="11 1234 5678"></div>
      <div class="field"><label>Mensaje (opcional)</label><textarea placeholder="¿En qué podemos ayudarte?"></textarea></div>
      <button class="submit">{{ctaText}}</button>
      <p class="privacy">Al enviar aceptás nuestra <a href="{{privacyUrl}}">política de privacidad</a></p>
    </div>
  </div>
</body>
</html>`

const templates = [
  {
    id: 1,
    name: 'promo-event',
    description: 'Landing para eventos promocionales. Ideal para Hot Sale, Black Friday o Cyber Monday.',
    requiredFields: ['title', 'subtitle', 'ctaText', 'ctaUrl', 'eventDate', 'heroImageUrl'],
    optionalFields: [],
    html: promoEventHtml
  },
  {
    id: 2,
    name: 'product-launch',
    description: 'Landing para lanzamiento de producto con precio, precio original y descripcion.',
    requiredFields: ['productName', 'productDescription', 'price', 'originalPrice', 'ctaText', 'ctaUrl'],
    optionalFields: [],
    html: productLaunchHtml
  },
  {
    id: 3,
    name: 'lead-capture',
    description: 'Landing minimalista con formulario de contacto para captura de leads.',
    requiredFields: ['title', 'description', 'ctaText', 'privacyUrl'],
    optionalFields: [],
    html: leadCaptureHtml
  }
]

module.exports = templates
