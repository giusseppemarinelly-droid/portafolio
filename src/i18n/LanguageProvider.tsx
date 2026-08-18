import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { copy } from '../data/copy'
import type { Copy } from '../data/copy'
import type { Locale } from '../data/types'

const STORAGE_KEY = 'gm-lang'

interface LanguageValue {
  locale: Locale
  t: Copy
  setLocale: (next: Locale) => void
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageValue | null>(null)

function initialLocale(): Locale {
  if (typeof window === 'undefined') return 'es'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'es' || saved === 'en') return saved
  // El sitio nace en español; solo cae a inglés si el navegador no habla español.
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])
  const toggleLocale = useCallback(() => setLocaleState((prev) => (prev === 'es' ? 'en' : 'es')), [])

  const value = useMemo<LanguageValue>(
    () => ({ locale, t: copy[locale], setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): LanguageValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <LanguageProvider>')
  return ctx
}
