const db = {
  nextLandingId: 5,
  nextLeadId: 4,
  landings: [
    {
      id: 1,
      templateId: 1,
      name: 'Hot Sale 2026 - SuenoSimple',
      client: 'SuenoSimple',
      status: 'active',
      fields: {
        title: 'Hot Sale 2026',
        subtitle: 'Hasta 50% off en colchones',
        ctaText: 'Ver ofertas',
        ctaUrl: 'https://suenosimple.com/hot-sale',
        eventDate: '2026-05-20',
        heroImageUrl: 'https://via.placeholder.com/1200x400'
      },
      createdAt: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 2,
      templateId: 2,
      name: 'Lanzamiento Economica Pro 2026',
      client: 'SuenoSimple',
      status: 'active',
      fields: {
        productName: 'Colchon Economica Pro',
        productDescription: 'El mejor descanso al mejor precio. Foam de alta densidad, cobertura antihumedad.',
        price: '85000',
        originalPrice: '120000',
        ctaText: 'Comprarlo ahora',
        ctaUrl: 'https://suenosimple.com/economica-pro'
      },
      createdAt: '2026-03-15T09:00:00.000Z'
    },
    {
      id: 3,
      templateId: 3,
      name: 'Captacion leads - Newsletter SuenoSimple',
      client: 'SuenoSimple',
      status: 'draft',
      fields: {
        title: 'Dormir bien no es un lujo',
        description: 'Suscribite y recibí ofertas exclusivas antes que nadie. Solo por tiempo limitado.',
        ctaText: 'Quiero ofertas',
        privacyUrl: 'https://suenosimple.com/privacidad'
      },
      createdAt: '2026-04-10T14:00:00.000Z'
    },
    {
      id: 4,
      templateId: 1,
      name: 'Black Friday 2026 - TechStore',
      client: 'TechStore',
      status: 'draft',
      fields: {
        title: 'Black Friday TechStore',
        subtitle: 'Los mejores precios del año en tecnología',
        ctaText: 'Ver productos',
        ctaUrl: 'https://techstore.com/black-friday',
        eventDate: '2026-11-27',
        heroImageUrl: 'https://via.placeholder.com/1200x400'
      },
      createdAt: '2026-04-12T11:00:00.000Z'
    }
  ],
  leads: [
    {
      id: 1,
      landingId: 3,
      name: 'Maria Gomez',
      email: 'maria@gmail.com',
      phone: '1134567890',
      message: null,
      createdAt: '2026-04-11T10:00:00.000Z'
    },
    {
      id: 2,
      landingId: 3,
      name: 'Juan Perez',
      email: 'juan.perez@gmail.com',
      phone: null,
      message: 'Quiero info del colchon matrimonial',
      createdAt: '2026-04-11T12:00:00.000Z'
    },
    {
      id: 3,
      landingId: 3,
      name: 'Laura Martinez',
      email: 'laura.m@hotmail.com',
      phone: '1145678901',
      message: null,
      createdAt: '2026-04-12T08:30:00.000Z'
    }
  ]
}

module.exports = db
