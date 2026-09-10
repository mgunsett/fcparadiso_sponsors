// Geometría de los espacios publicitarios: NO se traduce.
// Los textos de cada espacio (nombre, vista, nota) viven en src/data/content.<idioma>.js,
// indexados por el mismo `id`. Si tocás un id acá, tocalo también en los dos idiomas.

// Sectores de cartelería.
// Las coordenadas son porcentajes sobre la foto frontal de la tribuna (stand-front.webp),
// medidas sobre los paneles reales. Ajustá x/y/w/h si cambiás la foto.
export const boardSpots = [
  { id: 'A1', x: 6.5, y: 59.6, w: 7.5, h: 5.8, size: '3 × 1 m' },
  { id: 'A2', x: 14, y: 59.6, w: 9, h: 5.8, size: '3 × 1 m' },
  { id: 'A3', x: 23, y: 59.6, w: 8, h: 5.8, size: '3 × 1 m' },
  { id: 'A4', x: 31, y: 59.6, w: 8.5, h: 5.8, size: '3 × 1 m' },
  { id: 'A5', x: 39.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m', featured: true },
  { id: 'A6', x: 47.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m', featured: true },
  { id: 'A7', x: 55.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m', featured: true },
  { id: 'A8', x: 63.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m' },
  { id: 'A9', x: 71.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m' },
  { id: 'A10', x: 79.5, y: 59.6, w: 8.0, h: 5.8, size: '3 × 1 m' },
  { id: 'A11', x: 87.5, y: 59.6, w: 7.5, h: 5.8, size: '3 × 1 m' },
]

// Espacios en la camiseta. `side` define de qué lado del componente 3D aparece el recuadro,
// y `angle` (grados) es la rotación en Y en la que ese espacio queda de frente.
// El modelo mira al frente en 0°. Como los nombres son desde el punto de vista del
// jugador, un espacio sobre su izquierda queda a la derecha en pantalla y necesita
// ángulo negativo para girar hacia la cámara; sobre su derecha, positivo.
export const jerseySpots = [
  { id: 'J1', size: '25 × 10 cm', side: 'left', angle: 0, anchor: { x: 50, y: 48 } },
  { id: 'J2', size: '10 × 5 cm', side: 'left', angle: -15, anchor: { x: 36, y: 30 } },
  { id: 'J3', size: '8 × 6 cm', side: 'left', angle: -60, anchor: { x: 22, y: 34 } },
  { id: 'J4', size: '8 × 6 cm', side: 'right', angle: 60, anchor: { x: 78, y: 34 } },
  { id: 'J5', size: '25 × 8 cm', side: 'right', angle: 180, anchor: { x: 50, y: 22 } },
  { id: 'J6', size: '20 × 6 cm', side: 'right', angle: 180, anchor: { x: 50, y: 62 } },
]
