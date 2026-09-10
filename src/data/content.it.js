// Contenuti del sito in italiano.
// Traducción de src/data/content.es.js: misma forma, mismas claves, mismos ids.
// Si agregás una clave acá, agregala también en el archivo español (y al revés).

export default {
  meta: {
    lang: 'it',
    title: 'FC Paradiso · Spazi pubblicitari',
    description:
      'Diventa sponsor del FC Paradiso: cartellonistica a bordo campo e spazi sulla maglia ufficiale.',
  },

  club: {
    name: 'FC Paradiso',
    shortName: 'FC Paradiso',
    city: 'FC PARADISO · Svizzera',
    crest: '/images/escudo.svg',
  },

  nav: [
    { id: 'home', label: 'Home' },
    { id: 'estadio', label: 'Stadio' },
    { id: 'camiseta', label: 'Maglia' },
    { id: 'planes', label: 'Piani' },
    { id: 'contacto', label: 'Contatti' },
  ],

  hero: {
    title: 'IL TUO MARCHIO IN CAMPO',
    subtitle:
      'Cartellonistica a bordo campo e spazi sulla maglia ufficiale. Ogni partita in casa, ogni foto, ogni diretta.',
    ctas: [
      { label: 'Campo', target: 'estadio' },
      { label: 'Maglia', target: 'camiseta' },
    ],
  },

  boards: {
    A1: { name: 'Tribuna · pannello 1', view: 'Di fronte alla tribuna principale' },
    A2: { name: 'Tribuna · pannello 2', view: 'Di fronte alla tribuna principale' },
    A3: { name: 'Tribuna · pannello 3', view: 'Di fronte alla tribuna principale' },
    A4: { name: 'Tribuna · pannello 4', view: 'Di fronte alla tribuna principale' },
    A5: { name: 'Tribuna · pannello 5 (centro)', view: 'Linea di metà campo' },
    A6: { name: 'Tribuna · pannello 6 (centro)', view: 'Linea di metà campo' },
    A7: { name: 'Tribuna · pannello 7 (centro)', view: 'Linea di metà campo' },
    A8: { name: 'Tribuna · pannello 8', view: 'Di fronte alla tribuna principale' },
    A9: { name: 'Tribuna · pannello 9', view: 'Di fronte alla tribuna principale' },
    A10: { name: 'Tribuna · pannello 10', view: 'Di fronte alla tribuna principale' },
    A11: { name: 'Tribuna · pannello 11', view: 'Di fronte alla tribuna principale' },
  },

  stadiumSection: {
    title: 'Cartellonistica a bordo campo',
    intro:
      'Undici pannelli di fronte alla tribuna principale, all’altezza della telecamera e del pubblico. Scegline uno, carica il tuo logo e guarda l’effetto prima di chiedere un preventivo.',
    scrollHint: 'Scorri per entrare nello stadio',
    uploadLabel: 'Carica il tuo logo',
    uploadHint: 'PNG o SVG con sfondo trasparente',
    quoteCta: 'Richiedi un preventivo',
    clearCta: 'Rimuovi il logo',
    emptyState: 'Tocca un pannello per vedere i dettagli',
    sizeLabel: 'Dimensione',
    viewLabel: 'Posizione',
  },

  jersey: {
    J1: { name: 'Petto principale', note: 'Lo spazio più visibile. Presente in tutte le foto di squadra.' },
    J2: { name: 'Petto in alto a sinistra', note: 'Accanto allo stemma del club.' },
    J3: { name: 'Manica sinistra', note: 'Visibile nei primi piani e nelle esultanze.' },
    J4: { name: 'Manica destra', note: 'Visibile nei primi piani e nelle esultanze.' },
    J5: { name: 'Schiena in alto', note: 'Sopra il numero. Al centro dell’inquadratura TV nelle azioni di spalle.' },
    J6: { name: 'Schiena in basso', note: 'Sotto il numero.' },
  },

  jerseySection: {
    title: 'La maglia ufficiale',
    intro:
      'Sei spazi sulla maglia da gioco. Ruotala con il cursore o con il dito per vederli tutti.',
    dragHint: 'Trascina per ruotare',
    quoteCta: 'Richiedi un preventivo',
    modelNote: 'Maglia ufficiale · modello 3D',
    idleHint: 'Ruota la maglia fino allo spazio che ti interessa.',
    viewingLabel: 'Stai guardando',
  },

  plans: {
    title: 'Piani di sponsorizzazione',
    intro:
      'Tre livelli per entrare nel club. I prezzi dipendono da posizione, dimensione e durata: scrivici e prepariamo la proposta su misura.',
    cta: 'Richiedi informazioni',
    items: [
      {
        id: 'partner',
        name: 'Partner',
        tagline: 'Presenza in campo',
        benefits: [
          '1 pannello di cartellonistica a bordo campo',
          'Menzione sui canali social del club',
          'Logo sul sito ufficiale',
          '2 biglietti per ogni partita casalinga',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        tagline: 'Campo e maglia',
        highlight: true,
        benefits: [
          '2 pannelli di cartellonistica (zona centrale)',
          'Spazio sulla manica o sulla schiena della maglia',
          'Contenuti dedicati sui social',
          'Logo sul sito e sul maxischermo dello stadio',
          '4 biglietti per ogni partita casalinga',
        ],
      },
      {
        id: 'main',
        name: 'Main sponsor',
        tagline: 'Il marchio del club',
        benefits: [
          'Petto principale della maglia ufficiale',
          '4 pannelli di cartellonistica a bordo campo',
          'Naming nelle comunicazioni ufficiali',
          'Attivazioni allo stadio',
          'Skybox e hospitality a ogni partita',
        ],
      },
    ],
  },

  contact: {
    title: 'Parliamone',
    intro: 'Scegli il canale che preferisci. Rispondiamo in giornata.',
    channels: [
      { id: 'whatsapp', label: 'WhatsApp', value: '+41 00 000 00 00', href: 'https://wa.me/41000000000?text=Ciao%2C%20vorrei%20informazioni%20sulla%20sponsorizzazione%20del%20FC%20Paradiso' },
      { id: 'mail', label: 'Email', value: 'sponsor@fcparadiso.ch', href: 'mailto:sponsor@fcparadiso.ch' },
      { id: 'instagram', label: 'Instagram', value: '@fcparadiso', href: 'https://instagram.com/' },
      { id: 'marketing', label: 'Marketing', value: 'LED SPORTS Marketing ', href: 'mailto:marketing@fcparadiso.ch' },
    ],
  },

  footer: {
    rights: `© ${new Date().getFullYear()} FC Paradiso. Tutti i diritti riservati.`,
    credit: 'Sviluppo web — Matías Gunsett',
    creditHref: '#',
    socials: [
      { id: 'instagram', href: 'https://instagram.com/' },
      { id: 'facebook', href: 'https://facebook.com/' },
      { id: 'youtube', href: 'https://youtube.com/' },
    ],
  },

  ui: {
    navAria: 'Sezioni',
    homeAria: 'torna all’inizio',
    openMenu: 'Apri il menu',
    closeMenu: 'Chiudi il menu',
    crestAlt: 'Stemma',
    langAria: 'Cambia lingua',
    langName: 'Italiano',
  },

  quote: {
    sectorSubject: (id) => `Preventivo spazio ${id}`,
    planSubject: (plan) => `Informazioni piano ${plan}`,
    sectorMessage: (id, club) => `Ciao, vorrei un preventivo per lo spazio ${id} del ${club}.`,
    planMessage: (plan, club) => `Ciao, vorrei informazioni sul piano ${plan} del ${club}.`,
    sectorNote: (id) => `Richiesta sullo spazio ${id}`,
    planNote: (plan) => `Richiesta sul piano ${plan}`,
  },
}
