// Todo el contenido editable del sitio vive acá.
// Para traducir a IT/DE/FR después, duplicá este archivo por idioma.

export const club = {
  name: 'FC Paradiso',
  shortName: 'FC Paradiso',
  league: '3ª división · Suiza',
  city: 'Paradiso, Ticino',
  // TODO: reemplazar por el escudo real (SVG o PNG) en /public/images/escudo.svg
  crest: '/images/escudo.svg',
}

export const nav = [
  { id: 'estadio', label: 'Estadio' },
  { id: 'camiseta', label: 'Camiseta' },
  { id: 'planes', label: 'Planes' },
  { id: 'contacto', label: 'Contacto' },
]

export const hero = {
  title: 'Tu marca, en el campo de juego del FC Paradiso',
  subtitle:
    'Cartelería perimetral y espacios en la camiseta oficial. Cada partido en casa, cada foto, cada transmisión.',
  cta: 'Ver espacios disponibles',
  ctaTarget: 'estadio',
}

// Sectores de cartelería.
// Las coordenadas son porcentajes sobre la foto frontal de la tribuna (stand-front.webp),
// medidas sobre los paneles reales. Ajustá x/y/w/h si cambiás la foto.
export const boardSectors = [
  { id: 'A1', name: 'Tribuna · panel 1', x: 6.5, y: 59.6, w: 7.5, h: 5.8, size: '3 × 1 m', view: 'Frente a tribuna principal' },
  { id: 'A2', name: 'Tribuna · panel 2', x: 14, y: 59.6, w: 9, h: 5.8, size: '3 × 1 m', view: 'Frente a tribuna principal' },
  { id: 'A3', name: 'Tribuna · panel 3', x: 23, y: 59.6, w: 8, h: 5.8, size: '3 × 1 m', view: 'Frente a tribuna principal' },
  { id: 'A4', name: 'Tribuna · panel 4', x: 31, y: 59.6, w: 8.5, h: 5.8, size: '3 × 1 m', view: 'Frente a tribuna principal' },
  { id: 'A5', name: 'Tribuna · panel 5 (centro)', x: 39.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m', view: 'Línea de medio campo', featured: true },
  { id: 'A6', name: 'Tribuna · panel 6 (centro)', x: 47.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m', view: 'Línea de medio campo', featured: true },
  { id: 'A7', name: 'Tribuna · panel 7 (centro)', x: 55.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m', view: 'Línea de medio campo', featured: true },
  { id: 'A8', name: 'Tribuna · panel 8', x: 63.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m', view: 'Frente a tribuna principal' },
  { id: 'A9', name: 'Tribuna · panel 9', x: 71.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m', view: 'Frente a tribuna principal' },
  { id: 'A10', name: 'Tribuna · panel 10', x: 79.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m', view: 'Frente a tribuna principal' },
  { id: 'A11', name: 'Tribuna · panel 11', x: 87.5, y: 59.6, w: 7.5, h: 5.8, size: '3 × 1 m', view: 'Frente a tribuna principal' },
]

export const stadiumSection = {
  title: 'Cartelería perimetral',
  intro:
    'Once paneles frente a la tribuna principal, a la altura de la cámara y del público. Elegí uno, subí tu logo y mirá cómo queda antes de pedir presupuesto.',
  scrollHint: 'Desplazá para entrar al estadio',
  uploadLabel: 'Subí tu logo',
  uploadHint: 'PNG o SVG con fondo transparente',
  quoteCta: 'Pedir presupuesto',
  clearCta: 'Quitar logo',
  emptyState: 'Tocá un panel para ver el detalle',
}

// Espacios en la camiseta. `side` define de qué lado del componente 3D aparece el recuadro,
// y `angle` (grados) es la rotación en Y en la que ese espacio queda de frente.
export const jerseySectors = [
  { id: 'J1', name: 'Pecho principal', size: '25 × 10 cm', side: 'left', angle: 0, anchor: { x: 50, y: 48 }, note: 'El espacio de mayor visibilidad. Presente en todas las fotos de equipo.' },
  { id: 'J2', name: 'Pecho superior izquierdo', size: '10 × 5 cm', side: 'left', angle: 15, anchor: { x: 36, y: 30 }, note: 'Junto al escudo del club.' },
  { id: 'J3', name: 'Manga derecha', size: '8 × 6 cm', side: 'right', angle: -60, anchor: { x: 78, y: 34 }, note: 'Visible en primeros planos y celebraciones.' },
  { id: 'J4', name: 'Espalda superior', size: '25 × 8 cm', side: 'right', angle: 180, anchor: { x: 50, y: 22 }, note: 'Sobre el número. Foco de la cámara de TV en jugadas de espalda.' },
  { id: 'J5', name: 'Espalda inferior', size: '20 × 6 cm', side: 'right', angle: 180, anchor: { x: 50, y: 62 }, note: 'Bajo el número.' },
]

export const jerseySection = {
  title: 'La camiseta oficial',
  intro:
    'Cinco espacios en la camiseta de juego. Girala con el cursor o con el dedo para ver cada uno.',
  dragHint: 'Arrastrá para girar',
  quoteCta: 'Pedir presupuesto',
  placeholderNote: 'Modelo 3D en preparación · vista provisoria',
}

export const plans = {
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
}

export const contact = {
  title: 'Hablemos',
  intro: 'Elegí el canal que te quede más cómodo. Respondemos en el día.',
  channels: [
    // TODO: reemplazar por datos reales
    { id: 'whatsapp', label: 'WhatsApp', value: '+41 00 000 00 00', href: 'https://wa.me/41000000000?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sponsoreo%20en%20FC%20Paradiso' },
    { id: 'mail', label: 'Email', value: 'sponsor@fcparadiso.ch', href: 'mailto:sponsor@fcparadiso.ch' },
    { id: 'instagram', label: 'Instagram', value: '@fcparadiso', href: 'https://instagram.com/' },
    { id: 'marketing', label: 'Marketing', value: 'Nombre Apellido · Responsable comercial', href: 'mailto:marketing@fcparadiso.ch' },
  ],
}

export const footer = {
  rights: `© ${new Date().getFullYear()} FC Paradiso. Todos los derechos reservados.`,
  credit: 'Desarrollo web — Matías Gunsett',
  creditHref: '#',
  socials: [
    { id: 'instagram', href: 'https://instagram.com/' },
    { id: 'facebook', href: 'https://facebook.com/' },
    { id: 'youtube', href: 'https://youtube.com/' },
  ],
}
