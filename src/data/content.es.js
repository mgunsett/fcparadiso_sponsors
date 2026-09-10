// Contenido del sitio en español.
// La geometría de los espacios (coordenadas, medidas) vive en src/data/layout.js;
// acá van sólo los textos, indexados por el mismo id.
// Para sumar un idioma: duplicá este archivo y registralo en src/i18n/index.jsx.

export default {
  meta: {
    lang: 'es',
    title: 'FC Paradiso · Espacios publicitarios',
    description:
      'Sponsorea al FC Paradiso: cartelería en el campo de juego y espacios en la camiseta oficial.',
  },

  club: {
    name: 'FC Paradiso',
    shortName: 'FC Paradiso',
    city: 'FC PARADISO · Suiza',
    // TODO: reemplazar por el escudo real (SVG o PNG) en /public/images/escudo.svg
    crest: '/images/escudo.svg',
  },

  nav: [
    // 'home' apunta al <header> del Hero, que lleva ese id.
    { id: 'home', label: 'Home' },
    { id: 'estadio', label: 'Estadio' },
    { id: 'camiseta', label: 'Camiseta' },
    { id: 'planes', label: 'Planes' },
    { id: 'contacto', label: 'Contacto' },
  ],

  hero: {
    title: 'TU MARCA EN EL CAMPO',
    subtitle:
      'Cartelería perimetral y espacios en la camiseta oficial. Cada partido en casa, cada foto, cada transmisión.',
    // Dos accesos directos: cada uno baja a su sección.
    ctas: [
      { label: 'Campo', target: 'estadio' },
      { label: 'Camiseta', target: 'camiseta' },
    ],
  },

  // Textos de cada panel de cartelería (la posición está en layout.js).
  boards: {
    A1: { name: 'Tribuna · panel 1', view: 'Frente a tribuna principal' },
    A2: { name: 'Tribuna · panel 2', view: 'Frente a tribuna principal' },
    A3: { name: 'Tribuna · panel 3', view: 'Frente a tribuna principal' },
    A4: { name: 'Tribuna · panel 4', view: 'Frente a tribuna principal' },
    A5: { name: 'Tribuna · panel 5 (centro)', view: 'Línea de medio campo' },
    A6: { name: 'Tribuna · panel 6 (centro)', view: 'Línea de medio campo' },
    A7: { name: 'Tribuna · panel 7 (centro)', view: 'Línea de medio campo' },
    A8: { name: 'Tribuna · panel 8', view: 'Frente a tribuna principal' },
    A9: { name: 'Tribuna · panel 9', view: 'Frente a tribuna principal' },
    A10: { name: 'Tribuna · panel 10', view: 'Frente a tribuna principal' },
    A11: { name: 'Tribuna · panel 11', view: 'Frente a tribuna principal' },
  },

  stadiumSection: {
    title: 'Cartelería perimetral',
    intro:
      'Once paneles frente a la tribuna principal, a la altura de la cámara y del público. Elegí uno, subí tu logo y mirá cómo queda antes de pedir presupuesto.',
    scrollHint: 'Desplazá para entrar al estadio',
    uploadLabel: 'Subí tu logo',
    uploadHint: 'PNG o SVG con fondo transparente',
    quoteCta: 'Pedir presupuesto',
    clearCta: 'Quitar logo',
    emptyState: 'Tocá un panel para ver el detalle',
    sizeLabel: 'Medida',
    viewLabel: 'Ubicación',
  },

  // Textos de cada espacio de la camiseta (el ángulo y el lado están en layout.js).
  jersey: {
    J1: { name: 'Pecho principal', note: 'El espacio de mayor visibilidad. Presente en todas las fotos de equipo.' },
    J2: { name: 'Pecho superior izquierdo', note: 'Junto al escudo del club.' },
    J3: { name: 'Manga izquierda', note: 'Visible en primeros planos y celebraciones.' },
    J4: { name: 'Manga derecha', note: 'Visible en primeros planos y celebraciones.' },
    J5: { name: 'Espalda superior', note: 'Sobre el número. Foco de la cámara de TV en jugadas de espalda.' },
    J6: { name: 'Espalda inferior', note: 'Bajo el número.' },
  },

  jerseySection: {
    title: 'La camiseta oficial',
    intro:
      'Seis espacios en la camiseta de juego. Girala con el cursor o con el dedo para ver cada uno.',
    dragHint: 'Arrastrá para girar',
    quoteCta: 'Pedir presupuesto',
    modelNote: 'Camiseta oficial · modelo 3D',
    idleHint: 'Girá la camiseta hasta el espacio que te interese.',
    viewingLabel: 'Estás viendo',
  },

  plans: {
    title: 'Planes de sponsoreo',
    intro:
      'Tres niveles para entrar al club. Los precios se definen por posición, tamaño y duración; consultanos y armamos la propuesta.',
    cta: 'Consultar plan',
    items: [
      {
        id: 'partner',
        name: 'Partner',
        tagline: 'Presencia en el campo',
        benefits: [
          '1 panel de cartelería perimetral',
          'Mención en redes del club',
          'Logo en la web oficial',
          '2 entradas por partido de local',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        tagline: 'Campo y camiseta',
        highlight: true,
        benefits: [
          '2 paneles de cartelería (zona central)',
          'Espacio en manga o espalda de la camiseta',
          'Contenido dedicado en redes',
          'Logo en la web y en la pantalla del estadio',
          '4 entradas por partido de local',
        ],
      },
      {
        id: 'main',
        name: 'Main sponsor',
        tagline: 'La marca del club',
        benefits: [
          'Pecho principal de la camiseta oficial',
          '4 paneles de cartelería perimetral',
          'Naming en comunicaciones oficiales',
          'Activaciones en el estadio',
          'Palco y hospitalidad en cada partido',
        ],
      },
    ],
  },

  contact: {
    title: 'Hablemos',
    intro: 'Elegí el canal que te quede más cómodo. Respondemos en el día.',
    channels: [
      // TODO: reemplazar por datos reales
      { id: 'whatsapp', label: 'WhatsApp', value: '+41 00 000 00 00', href: 'https://wa.me/41000000000?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sponsoreo%20en%20FC%20Paradiso' },
      { id: 'mail', label: 'Email', value: 'sponsor@fcparadiso.ch', href: 'mailto:sponsor@fcparadiso.ch' },
      { id: 'instagram', label: 'Instagram', value: '@fcparadiso', href: 'https://instagram.com/' },
      { id: 'marketing', label: 'Marketing', value: 'LED SPORTS Marketing ', href: 'mailto:marketing@fcparadiso.ch' },
    ],
  },

  footer: {
    rights: `© ${new Date().getFullYear()} FC Paradiso. Todos los derechos reservados.`,
    credit: 'Desarrollo web — Matías Gunsett',
    creditHref: '#',
    socials: [
      { id: 'instagram', href: 'https://instagram.com/' },
      { id: 'facebook', href: 'https://facebook.com/' },
      { id: 'youtube', href: 'https://youtube.com/' },
    ],
  },

  // Etiquetas sueltas de interfaz (aria-labels, alt, microcopy).
  ui: {
    navAria: 'Secciones',
    homeAria: 'volver al inicio',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    crestAlt: 'Escudo',
    langAria: 'Cambiar idioma',
    langName: 'Español',
  },

  // Mensajes prellenados al pedir presupuesto desde un espacio o un plan.
  quote: {
    sectorSubject: (id) => `Presupuesto espacio ${id}`,
    planSubject: (plan) => `Consulta plan ${plan}`,
    sectorMessage: (id, club) => `Hola, quiero pedir presupuesto por el espacio ${id} en ${club}.`,
    planMessage: (plan, club) => `Hola, quiero consultar por el plan ${plan} en ${club}.`,
    sectorNote: (id) => `Consulta sobre el espacio ${id}`,
    planNote: (plan) => `Consulta sobre el plan ${plan}`,
  },
}
