import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import es from '../data/content.es'
import it from '../data/content.it'
import { boardSpots, jerseySpots } from '../data/layout'

// Idiomas disponibles, en el orden en que aparecen en el switch del navbar.
// El italiano va primero: es el idioma principal del sitio.
export const languages = [
  { code: 'it', short: 'IT', name: 'Italiano' },
  { code: 'es', short: 'ES', name: 'Español' },
]

const dictionaries = { es, it }
const DEFAULT_LANG = 'it'
const STORAGE_KEY = 'fcp:lang'

// Los textos de cada espacio se guardan por id y la geometría aparte (layout.js):
// acá se juntan para que los componentes reciban la forma de siempre.
const merge = (dict) => ({
  ...dict,
  boardSectors: boardSpots.map((s) => ({ ...s, ...dict.boards[s.id] })),
  jerseySectors: jerseySpots.map((s) => ({ ...s, ...dict.jersey[s.id] })),
})

const merged = Object.fromEntries(Object.entries(dictionaries).map(([code, dict]) => [code, merge(dict)]))

// El sitio abre siempre en italiano; sólo se respeta el idioma que el visitante
// haya elegido antes con el switch. No se mira el idioma del navegador a propósito.
function initialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && merged[saved]) return saved
  } catch {
    // localStorage puede estar bloqueado (modo privado): abrimos en italiano.
  }
  return DEFAULT_LANG
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  const content = merged[lang] ?? merged[DEFAULT_LANG]

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Sin persistencia el switch igual funciona durante la visita.
    }
    document.documentElement.lang = content.meta.lang
    document.title = content.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description)
  }, [lang, content])

  const value = useMemo(() => ({ lang, setLang, content }), [lang, content])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n() necesita estar dentro de <I18nProvider>')
  return ctx
}

// Atajo para los componentes que sólo leen textos.
export function useContent() {
  return useI18n().content
}
