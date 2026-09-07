import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { boardSectors } from '../data/content'

const AERIAL = '/images/stadium-aerial.webp'
const GROUND = '/images/stand-front.webp'

// Punto de la foto aérea hacia el que "baja" la cámara (tribuna principal), en 0..1.
const AERIAL_TARGET = { x: 0.77, y: 0.42 }
const AERIAL_ZOOM = 3.0
// Zoom al elegir un panel.
const SECTOR_ZOOM = 2.4

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smooth = (t) => t * t * (3 - 2 * t)

function useSrgbTexture(url) {
  const tex = useLoader(THREE.TextureLoader, url)
  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.needsUpdate = true
  }, [tex])
  return tex
}

// Tamaño de un plano que cubre el viewport (object-fit: cover) para un aspect dado.
function useCoverSize(aspect) {
  const { viewport } = useThree()
  return useMemo(() => {
    const w = Math.max(viewport.width, viewport.height * aspect)
    return [w, w / aspect]
  }, [viewport.width, viewport.height, aspect])
}

function AerialLayer({ progress }) {
  const tex = useSrgbTexture(AERIAL)
  const aspect = tex.image.width / tex.image.height
  const [W, H] = useCoverSize(aspect)
  const mesh = useRef()

  useFrame(() => {
    const p = progress.current
    const z = smooth(clamp01(p / 0.55))
    const s = 1 + (AERIAL_ZOOM - 1) * z
    const m = mesh.current
    m.scale.setScalar(s)
    m.position.x = (0.5 - AERIAL_TARGET.x) * W * s
    m.position.y = -(0.5 - AERIAL_TARGET.y) * H * s
    m.rotation.x = -0.22 * z
    m.material.opacity = 1 - clamp01((p - 0.45) / 0.25)
    m.visible = m.material.opacity > 0.001
  })

  return (
    <mesh ref={mesh} position-z={-0.5}>
      <planeGeometry args={[W, H]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

function LogoDecal({ url, sector, W, H }) {
  const tex = useSrgbTexture(url)
  const pw = (sector.w / 100) * W * 0.86
  const ph = (sector.h / 100) * H * 0.78
  const ta = tex.image.width / tex.image.height
  // Encajar el logo dentro del panel manteniendo proporción.
  let w = pw
  let h = w / ta
  if (h > ph) {
    h = ph
    w = h * ta
  }
  return (
    <mesh position={[0, 0, 0.03]}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} />
    </mesh>
  )
}

function Sector({ sector, W, H, selected, active, onSelect, logoUrl }) {
  const cx = (sector.x + sector.w / 2) / 100
  const cy = (sector.y + sector.h / 2) / 100
  const w = (sector.w / 100) * W
  const h = (sector.h / 100) * H
  const pts = useMemo(
    () => [
      [-w / 2, -h / 2, 0],
      [w / 2, -h / 2, 0],
      [w / 2, h / 2, 0],
      [-w / 2, h / 2, 0],
      [-w / 2, -h / 2, 0],
    ],
    [w, h],
  )

  return (
    <group position={[(cx - 0.5) * W, (0.5 - cy) * H, 0.02]}>
      {selected && (
        <>
          <mesh>
            <planeGeometry args={[w, h]} />
            <meshBasicMaterial color="#E3C24C" transparent opacity={0.18} depthWrite={false} />
          </mesh>
          <Line points={pts} color="#E3C24C" lineWidth={2} />
          {logoUrl && (
            <Suspense fallback={null}>
              <LogoDecal url={logoUrl} sector={sector} W={W} H={H} />
            </Suspense>
          )}
        </>
      )}
      {active && (
        <Html center zIndexRange={[20, 0]} style={{ pointerEvents: 'auto' }}>
          <button
            type="button"
            onClick={() => onSelect(sector.id)}
            aria-label={`${sector.name}, ${sector.size}`}
            data-selected={selected ? 'true' : 'false'}
            data-featured={sector.featured ? 'true' : 'false'}
            className="sector-marker"
          >
            <span className="sector-marker__dot" />
            <span className="sector-marker__label">{sector.id}</span>
          </button>
        </Html>
      )}
    </group>
  )
}

function GroundLayer({ progress, selectedId, onSelect, logoUrl, active }) {
  const tex = useSrgbTexture(GROUND)
  const aspect = tex.image.width / tex.image.height
  const [W, H] = useCoverSize(aspect)
  const group = useRef()
  const mat = useRef()
  // Estado de foco (zoom a un panel), animado con GSAP fuera del render de React.
  const focus = useRef({ scale: 1, ox: 0, oy: 0 })

  useEffect(() => {
    const sector = boardSectors.find((s) => s.id === selectedId)
    const target = sector
      ? {
          scale: SECTOR_ZOOM,
          ox: 0.5 - (sector.x + sector.w / 2) / 100,
          oy: -(0.5 - (sector.y + sector.h / 2) / 100),
        }
      : { scale: 1, ox: 0, oy: 0 }
    const tween = gsap.to(focus.current, { ...target, duration: 1.1, ease: 'power3.inOut' })
    return () => tween.kill()
  }, [selectedId])

  useFrame(() => {
    const p = progress.current
    const reveal = clamp01((p - 0.45) / 0.25)
    const settle = smooth(clamp01((p - 0.45) / 0.35))
    const base = 1.25 - 0.25 * settle
    const s = base * focus.current.scale
    const g = group.current
    g.scale.setScalar(s)
    g.position.x = focus.current.ox * W * s
    g.position.y = focus.current.oy * H * s
    mat.current.opacity = reveal
    g.visible = reveal > 0.001
  })

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial ref={mat} map={tex} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      {boardSectors.map((sector) => (
        <Sector
          key={sector.id}
          sector={sector}
          W={W}
          H={H}
          selected={sector.id === selectedId}
          active={active}
          onSelect={onSelect}
          logoUrl={logoUrl}
        />
      ))}
    </group>
  )
}

/**
 * progress: ref 0..1 controlado por ScrollTrigger.
 * active: true cuando la sección ya está a nivel de campo (muestra hotspots).
 */
export default function StadiumScene({ progress, selectedId, onSelect, logoUrl, active }) {
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      camera={{ fov: 38, position: [0, 0, 10], near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <AerialLayer progress={progress} />
        <GroundLayer
          progress={progress}
          selectedId={selectedId}
          onSelect={onSelect}
          logoUrl={logoUrl}
          active={active}
        />
      </Suspense>
    </Canvas>
  )
}
