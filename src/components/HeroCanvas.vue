<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let renderer: THREE.WebGLRenderer | null = null

onMounted(() => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const W = canvas.offsetWidth
  const H = canvas.offsetHeight

  // ─── Scene ───────────────────────────────────────────────
  const scene = new THREE.Scene()

  // ─── Camera ──────────────────────────────────────────────
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200)
  camera.position.set(0, 0, 30)

  // ─── Renderer ────────────────────────────────────────────
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // ─── Mouse tracking ──────────────────────────────────────
  const mouse = { x: 0, y: 0 }
  const onMouseMove = (e: MouseEvent) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('mousemove', onMouseMove)

  // ─────────────────────────────────────────────────────────
  // 1. PARTICLE FIELD — Floating glowing dots
  // ─────────────────────────────────────────────────────────
  const PARTICLE_COUNT = 320
  const particleGeo = new THREE.BufferGeometry()
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const particleSpeeds = new Float32Array(PARTICLE_COUNT)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 80
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    particleSpeeds[i] = 0.2 + Math.random() * 0.6
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particleMat = new THREE.PointsMaterial({
    color: 0x93c5fd, // blue-300
    size: 0.22,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  })
  const particles = new THREE.Points(particleGeo, particleMat)
  scene.add(particles)

  // ─────────────────────────────────────────────────────────
  // 2. CONNECTION LINES — Dynamic network graph
  // ─────────────────────────────────────────────────────────
  const NODE_COUNT = 28
  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20,
      ),
    )
  }

  const nodeVelocities = nodes.map(() => ({
    x: (Math.random() - 0.5) * 0.018,
    y: (Math.random() - 0.5) * 0.018,
    z: (Math.random() - 0.5) * 0.008,
  }))

  const MAX_DIST = 14
  const lineGeo = new THREE.BufferGeometry()
  const maxLines = NODE_COUNT * NODE_COUNT
  const linePositions = new Float32Array(maxLines * 6)
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

  const lineMat = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({
      color: 0x60a5fa, // blue-400
      transparent: true,
      opacity: 0.25,
    }),
  )
  scene.add(lineMat)

  // ─────────────────────────────────────────────────────────
  // 3. NODE DOTS — Glowing spheres at graph vertices
  // ─────────────────────────────────────────────────────────
  const nodeMeshes: THREE.Mesh[] = []
  const nodeSphereGeo = new THREE.SphereGeometry(0.18, 8, 8)
  for (let i = 0; i < NODE_COUNT; i++) {
    const hue = 0.58 + Math.random() * 0.1 // blue-ish hue
    const color = new THREE.Color().setHSL(hue, 1, 0.75)
    const mesh = new THREE.Mesh(
      nodeSphereGeo,
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }),
    )
    mesh.position.copy(nodes[i]!)
    scene.add(mesh)
    nodeMeshes.push(mesh)
  }

  // ─────────────────────────────────────────────────────────
  // 4. FLOATING WIREFRAME SHAPES — Icosahedra & Octahedra
  // ─────────────────────────────────────────────────────────
  interface FloatingShape {
    mesh: THREE.Mesh
    rx: number
    ry: number
    rz: number
    floatSpeed: number
    floatOffset: number
    pulseSpeed: number
  }
  const floatingShapes: FloatingShape[] = []

  const shapeConfigs = [
    { geo: new THREE.IcosahedronGeometry(3.2, 1), x: -18, y: 6, z: -8, opacity: 0.13 },
    { geo: new THREE.OctahedronGeometry(2.4, 0), x: 16, y: -5, z: -5, opacity: 0.11 },
    { geo: new THREE.IcosahedronGeometry(1.8, 0), x: 8, y: 10, z: 2, opacity: 0.15 },
    { geo: new THREE.TorusGeometry(3, 0.08, 8, 40), x: -8, y: -8, z: -3, opacity: 0.12 },
    { geo: new THREE.OctahedronGeometry(1.4, 0), x: 20, y: 8, z: -10, opacity: 0.1 },
    { geo: new THREE.IcosahedronGeometry(2.6, 1), x: -22, y: -6, z: -6, opacity: 0.09 },
    { geo: new THREE.TorusGeometry(2, 0.06, 6, 32), x: 12, y: -10, z: -2, opacity: 0.1 },
  ]

  for (const cfg of shapeConfigs) {
    const mat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: cfg.opacity,
    })
    const mesh = new THREE.Mesh(cfg.geo, mat)
    mesh.position.set(cfg.x, cfg.y, cfg.z)
    scene.add(mesh)
    floatingShapes.push({
      mesh,
      rx: (Math.random() - 0.5) * 0.006,
      ry: (Math.random() - 0.5) * 0.008,
      rz: (Math.random() - 0.5) * 0.004,
      floatSpeed: 0.3 + Math.random() * 0.4,
      floatOffset: Math.random() * Math.PI * 2,
      pulseSpeed: 0.4 + Math.random() * 0.6,
    })
  }

  // ─────────────────────────────────────────────────────────
  // 5. CENTRAL GLOWING RING — Brand focal point
  // ─────────────────────────────────────────────────────────
  const ringGeo = new THREE.TorusGeometry(5.5, 0.04, 6, 80)
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.25,
  })
  const ring1 = new THREE.Mesh(ringGeo, ringMat)
  ring1.rotation.x = Math.PI * 0.35
  scene.add(ring1)

  const ring2Geo = new THREE.TorusGeometry(7.5, 0.025, 6, 80)
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    transparent: true,
    opacity: 0.15,
  })
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
  ring2.rotation.x = Math.PI * 0.5
  ring2.rotation.z = Math.PI * 0.2
  scene.add(ring2)

  // ─────────────────────────────────────────────────────────
  // 6. WAVE GRID at the bottom
  // ─────────────────────────────────────────────────────────
  const GRID_W = 30
  const GRID_H = 18
  const waveGeo = new THREE.PlaneGeometry(60, 30, GRID_W, GRID_H)
  const waveMat = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    wireframe: true,
    transparent: true,
    opacity: 0.07,
  })
  const wave = new THREE.Mesh(waveGeo, waveMat)
  wave.rotation.x = -Math.PI * 0.42
  wave.position.set(0, -16, -5)
  scene.add(wave)

  // ─────────────────────────────────────────────────────────
  // ANIMATION LOOP
  // ─────────────────────────────────────────────────────────
  let t = 0
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    t += 0.012

    // Camera subtle drift following mouse
    camera.position.x += (mouse.x * 4 - camera.position.x) * 0.04
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)

    // Rotate particles slowly
    particles.rotation.y = t * 0.025
    particles.rotation.x = t * 0.012

    // Animate wave vertices
    const wavePos = waveGeo.attributes.position as THREE.BufferAttribute
    for (let i = 0; i <= GRID_W; i++) {
      for (let j = 0; j <= GRID_H; j++) {
        const idx = i * (GRID_H + 1) + j
        const x = (wavePos.getX(idx) / 60) * Math.PI * 2
        wavePos.setZ(idx, Math.sin(x * 3 + t * 1.5) * 0.8 + Math.cos(j * 0.5 + t) * 0.4)
      }
    }
    wavePos.needsUpdate = true

    // Move network nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i]!
      const v = nodeVelocities[i]!
      n.x += v.x
      n.y += v.y
      n.z += v.z
      if (Math.abs(n.x) > 25) v.x *= -1
      if (Math.abs(n.y) > 18) v.y *= -1
      if (Math.abs(n.z) > 10) v.z *= -1
      nodeMeshes[i]!.position.copy(n)
    }

    // Rebuild connection lines
    let lineIdx = 0
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const ni = nodes[i]!
        const nj = nodes[j]!
        const dist = ni.distanceTo(nj)
        if (dist < MAX_DIST) {
          linePositions[lineIdx * 6 + 0] = ni.x
          linePositions[lineIdx * 6 + 1] = ni.y
          linePositions[lineIdx * 6 + 2] = ni.z
          linePositions[lineIdx * 6 + 3] = nj.x
          linePositions[lineIdx * 6 + 4] = nj.y
          linePositions[lineIdx * 6 + 5] = nj.z
          lineIdx++
        }
      }
    }
    lineGeo.setDrawRange(0, lineIdx * 2)
    ;(lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true

    // Floating shapes
    for (const s of floatingShapes) {
      s.mesh.rotation.x += s.rx
      s.mesh.rotation.y += s.ry
      s.mesh.rotation.z += s.rz
      s.mesh.position.y += Math.sin(t * s.floatSpeed + s.floatOffset) * 0.012
      // Pulse opacity
      const mat = s.mesh.material as THREE.MeshBasicMaterial
      mat.opacity = 0.06 + Math.sin(t * s.pulseSpeed + s.floatOffset) * 0.04
    }

    // Rotate rings
    ring1.rotation.z = t * 0.08
    ring2.rotation.z = -t * 0.05
    ring2.rotation.y = t * 0.06

    // Pulse ring opacity
    const ringOpacity = 0.15 + Math.sin(t * 0.8) * 0.08
    ringMat.opacity = ringOpacity
    ring2Mat.opacity = ringOpacity * 0.6

    renderer!.render(scene, camera)
  }
  animate()

  // ─────────────────────────────────────────────────────────
  // RESIZE
  // ─────────────────────────────────────────────────────────
  const onResize = () => {
    if (!canvasRef.value || !renderer) return
    const w = canvasRef.value.offsetWidth
    const h = canvasRef.value.offsetHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    renderer?.dispose()
    scene.clear()
  })
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  renderer?.dispose()
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full pointer-events-none"
    style="z-index: 1"
  />
</template>
