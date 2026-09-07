import { Suspense, useEffect, useImperativeHandle, useRef, forwardRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

const JERSEY_IMG = '/images/jersey-placeholder.webp'
const DEG = Math.PI / 180

/**
 * PLACEHOLDER hasta tener el modelo real.
 * Cuando llegue el .glb:
 *   import { useGLTF } from '@react-three/drei'
 *   const { scene } = useGLTF('/models/jersey.glb')
 *   return <primitive object={scene} scale={...} />
 * y reemplazá <PlaceholderJersey /> por ese componente. El resto (drag, inercia,
 * callouts) no cambia porque todo cuelga del <group> rotado en Y.
 */
function PlaceholderJersey() {
  const tex = useLoader(THREE.TextureLoader, JERSEY_IMG)
  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.needsUpdate = true
  }, [tex])
  const aspect = tex.image.width / tex.image.height
  const h = 3.2
  const w = h * aspect
  // Cilindro abierto: le da volumen a la foto plana al girar.
  const radius = w * 0.9
  const theta = w / radius

  return (
    <group>
      {/* Frente */}
      <mesh position={[0, 0, -radius]}>
        <cylinderGeometry args={[radius, radius, h, 48, 1, true, -theta / 2, theta]} />
        <meshStandardMaterial map={tex} side={THREE.FrontSide} roughness={0.85} />
      </mesh>
      {/* Espalda: misma textura oscurecida (provisorio) */}
      <mesh position={[0, 0, radius]} rotation-y={Math.PI}>
        <cylinderGeometry args={[radius, radius, h, 48, 1, true, -theta / 2, theta]} />
        <meshStandardMaterial map={tex} color="#9fb3a4" side={THREE.FrontSide} roughness={0.9} />
      </mesh>
    </group>
  )
}

const Rig = forwardRef(function Rig({ onAngle }, ref) {
  const group = useRef()
  const state = useRef({ angle: 0, velocity: 0, dragging: false, lastX: 0, autoTimer: 0 })
  const { gl } = useThree()

  useImperativeHandle(ref, () => ({
    rotateTo(deg) {
      const s = state.current
      // Camino más corto.
      const target = deg * DEG
      let delta = ((target - s.angle + Math.PI) % (2 * Math.PI)) - Math.PI
      if (delta < -Math.PI) delta += 2 * Math.PI
      s.velocity = 0
      gsap.to(s, { angle: s.angle + delta, duration: 0.9, ease: 'power3.inOut' })
    },
  }))

  useEffect(() => {
    const el = gl.domElement
    const s = state.current
    const down = (e) => {
      s.dragging = true
      s.velocity = 0
      s.lastX = e.clientX
      el.setPointerCapture?.(e.pointerId)
    }
    const move = (e) => {
      if (!s.dragging) return
      const dx = e.clientX - s.lastX
      s.lastX = e.clientX
      const d = dx * 0.008
      s.angle += d
      s.velocity = d
    }
    const up = () => {
      s.dragging = false
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('pointerleave', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      el.removeEventListener('pointerleave', up)
    }
  }, [gl])

  const lastReport = useRef(0)
  useFrame(({ clock }) => {
    const s = state.current
    if (!s.dragging) {
      s.angle += s.velocity
      s.velocity *= 0.94
      if (Math.abs(s.velocity) < 0.0004) s.velocity = 0
    }
    group.current.rotation.y = s.angle
    // Leve balanceo para que no se sienta estática.
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.6) * 0.015

    const now = clock.elapsedTime
    if (now - lastReport.current > 0.12) {
      lastReport.current = now
      const deg = ((s.angle / DEG) % 360 + 360) % 360
      onAngle?.(deg)
    }
  })

  return (
    <group ref={group}>
      <Suspense fallback={null}>
        <PlaceholderJersey />
      </Suspense>
    </group>
  )
})

const JerseyScene = forwardRef(function JerseyScene({ onAngle }, ref) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 32, position: [0, 0, 9], near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: 'pan-y', cursor: 'grab' }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 6]} intensity={1.4} />
      <directionalLight position={[-4, -2, -6]} intensity={0.5} />
      <Rig ref={ref} onAngle={onAngle} />
    </Canvas>
  )
})

export default JerseyScene
