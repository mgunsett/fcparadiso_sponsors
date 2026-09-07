# FC Paradiso · Espacios publicitarios

React 18 · Vite · Chakra UI v2 · Framer Motion · GSAP (ScrollTrigger) · Three.js (react-three-fiber + drei). JavaScript, pnpm.

```bash
pnpm install
pnpm dev
```

## Estructura

```
src/
  data/content.js        ← TODOS los textos, sectores, planes y contacto (editar acá)
  theme/index.js         ← paleta, tipografías y variantes de Button
  sections/              ← Hero, StadiumImmersion, JerseySection, Plans, Contact, Footer
  scenes/                ← StadiumScene (inmersión) y JerseyScene (camiseta 3D)
  components/Navbar.jsx  ← nav flotante sticky bottom
  hooks/useScrollTo.js   ← scroll a secciones + contexto del pedido de presupuesto
  styles.css             ← estilos para markers dentro de drei <Html> (fuera de Chakra)
public/images/           ← fotos optimizadas (webp)
```

## Pendientes marcados con TODO
- `public/images/hero.webp` y el `<Image>` comentado en `sections/Hero.jsx`
- `public/images/escudo.svg` (hoy es un placeholder)
- Modelo 3D `public/models/jersey.glb` → instrucciones en `scenes/JerseyScene.jsx`
- Datos reales de contacto en `data/content.js`

## Cómo funciona la inmersión
`StadiumImmersion` es una sección de 320vh con un contenedor sticky de 100vh. ScrollTrigger escribe el progreso (0..1) en un ref que `StadiumScene` lee en `useFrame`:
- 0 → 0.55: zoom y leve inclinación sobre la vista aérea hacia la tribuna principal
- 0.45 → 0.75: fundido a la foto frontal de la tribuna
- > 0.62: aparecen los markers sobre los 11 paneles; al tocar uno la cámara hace zoom y se puede proyectar un logo

Las coordenadas de los paneles (`boardSectors` en `content.js`) son porcentajes sobre `stand-front.webp`.
