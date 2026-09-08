/**
 * Prepara el .glb de la camiseta para web.
 *
 * El escaneo original (model-src/jersey-source.glb) pesa ~57 MB: 2 M de triángulos
 * y un atlas de 8192². Inservible para el navegador. Este script lo deja en ~1,5 MB:
 *
 *   1. Corrige el material. El exportador marcó metallicFactor: 1 y adjuntó un mapa
 *      metallicRoughness. La camiseta es tela, no metal, y ese mapa costaría ~67 MB
 *      de VRAM sin aportar nada, así que se elimina la referencia y se fijan valores
 *      constantes. El paso `prune` del CLI descarta después la imagen ya huérfana.
 *   2. Delega en gltf-transform: weld + simplify (meshoptimizer) para la geometría,
 *      WebP 4096 para el atlas y compresión meshopt del buffer.
 *
 * Se compone con el CLI en vez de hacerlo todo por API porque el paso 1 necesita
 * tocar el JSON del GLB antes de que se comprima el buffer.
 *
 * Uso: pnpm run optimize:model
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const SOURCE = 'model-src/jersey-source.glb'
const OUTPUT = 'public/models/jersey.glb'

const GLB_MAGIC = 0x46546c67
const CHUNK_JSON = 0x4e4f534a

const mb = (n) => (n / 1024 ** 2).toFixed(2) + ' MB'

function readGlb(file) {
  const buf = fs.readFileSync(file)
  if (buf.readUInt32LE(0) !== GLB_MAGIC) throw new Error(`${file} no es un GLB`)
  const chunks = []
  let off = 12
  while (off < buf.length) {
    const length = buf.readUInt32LE(off)
    const type = buf.readUInt32LE(off + 4)
    chunks.push({ type, data: buf.subarray(off + 8, off + 8 + length) })
    off += 8 + length
  }
  const jsonChunk = chunks.find((c) => c.type === CHUNK_JSON)
  return { json: JSON.parse(jsonChunk.data.toString('utf8')), chunks }
}

function writeGlb(file, json, chunks) {
  // El chunk JSON se rellena con espacios y el binario con ceros: ambos deben
  // quedar alineados a 4 bytes o los loaders rechazan el archivo.
  const rebuilt = chunks.map((chunk) => {
    const raw = chunk.type === CHUNK_JSON ? Buffer.from(JSON.stringify(json), 'utf8') : chunk.data
    const padding = (4 - (raw.length % 4)) % 4
    const data = padding
      ? Buffer.concat([raw, Buffer.alloc(padding, chunk.type === CHUNK_JSON ? 0x20 : 0x00)])
      : raw
    const header = Buffer.alloc(8)
    header.writeUInt32LE(data.length, 0)
    header.writeUInt32LE(chunk.type, 4)
    return Buffer.concat([header, data])
  })
  const body = Buffer.concat(rebuilt)
  const header = Buffer.alloc(12)
  header.writeUInt32LE(GLB_MAGIC, 0)
  header.writeUInt32LE(2, 4)
  header.writeUInt32LE(header.length + body.length, 8)
  fs.writeFileSync(file, Buffer.concat([header, body]))
}

if (!fs.existsSync(SOURCE)) {
  console.error(`Falta ${SOURCE}. El escaneo original no se versiona: pedilo y dejalo ahí.`)
  process.exit(1)
}

const { json, chunks } = readGlb(SOURCE)

for (const material of json.materials ?? []) {
  const pbr = material.pbrMetallicRoughness
  if (!pbr) continue
  delete pbr.metallicRoughnessTexture
  pbr.metallicFactor = 0
  pbr.roughnessFactor = 0.8
}

const staged = path.join(os.tmpdir(), 'jersey-staged.glb')
writeGlb(staged, json, chunks)

// Se invoca el entrypoint JS con el propio Node: Node 22 rechaza con EINVAL el
// spawn de los shims .CMD que pnpm deja en node_modules/.bin bajo Windows.
const cliDir = path.join('node_modules', '@gltf-transform', 'cli')
const cli = path.join(cliDir, JSON.parse(fs.readFileSync(path.join(cliDir, 'package.json'), 'utf8')).bin['gltf-transform'])
execFileSync(
  process.execPath,
  [
    cli,
    'optimize', staged, OUTPUT,
    '--compress', 'meshopt',
    // ~159 k triángulos: suficiente para el pliegue de la tela, y el detalle fino
    // vive en el atlas de todos modos.
    '--simplify-ratio', '0.08',
    '--simplify-error', '0.01',
    '--texture-compress', 'webp',
    '--texture-size', '4096',
  ],
  { stdio: 'inherit' },
)
fs.rmSync(staged, { force: true })

console.log(`\n${SOURCE} ${mb(fs.statSync(SOURCE).size)}  ->  ${OUTPUT} ${mb(fs.statSync(OUTPUT).size)}`)
