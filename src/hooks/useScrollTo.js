import { useSyncExternalStore } from 'react'

// Mini store sin dependencias: guarda qué sector/plan motivó el pedido de presupuesto
// para prellenar el mensaje de WhatsApp / mail en la sección de contacto.
let quoteContext = null
const listeners = new Set()

export function setQuoteContext(ctx) {
  quoteContext = ctx
  listeners.forEach((l) => l())
}

export function useQuoteContext() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => quoteContext,
  )
}

export function scrollToId(id, ctx) {
  if (ctx) setQuoteContext(ctx)
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}
