import { Suspense, useImperativeHandle, useEffect, useMemo, useRef, forwardRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

const MODEL_URL = '/models/jersey.glb'
// Alto en unidades de escena al que se normaliza el modelo, venga con la escala
// que venga desde el exportador.
const TARGET_HEIGHT = 3.2
const DEG = Math.PI / 180

// El .glb se sirve comprimido con meshopt (ver scripts/optimize-model.mjs). El
// decoder de meshopt ya viaja dentro de three-stdlib, así que useGLTF lo resuelve
// solo; se pasa useDraco=false para que no instancie el DRACOLoader, que iría a
// buscar su decoder a un CDN de Google en cada visita.
const useJersey = () => useGLTF(MODEL_URL, false)

function Jersey() {
  const { scene } = useJersey()
  const { gl } = useThree()

  const model = useMemo(() => {
    // Se clona para no escribirle escala ni posición al objeto cacheado por drei:
    // clone() comparte geometrías y materiales, así que no duplica memoria.
    const root = scene.clone(true)
    const box = new THREE.Box3().setFromObject(root)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const scale = TARGET_HEIGHT / size.y
    root.scale.setScalar(scale)
    // Centrar en el origen para que gire sobre su propio eje y no orbitando.
    root.position.copy(center).multiplyScalar(-scale)

    const maxAnisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())
    root.traverse((o) => {
      if (!o.isMesh) return
      // El atlas es de 4096 y la tela se ve muy oblicua en los costados al girar:
      // sin anisotropía las rayas se empastan ahí.
      if (o.material.map) {
        o.material.map.anisotropy = maxAnisotropy
        o.material.map.needsUpdate = true
      }
    })
    return root
  }, [scene, gl])

  return <primitive object={model} />
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
        <Jersey />
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
      <ambientLight intensity={1} />
      <directionalLight position={[3, 4, 6]} intensity={1.6} />
      <directionalLight position={[-4, -2, -6]} intensity={0.55} />
      <Rig ref={ref} onAngle={onAngle} />
    </Canvas>
  )
})

// El modelo es lo primero que se mira de la sección: se empieza a bajar apenas
// carga el chunk en vez de esperar a que el <Canvas> monte.
useGLTF.preload(MODEL_URL, false)

export default JerseyScene
