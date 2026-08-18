import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'gm-theme'
export type Theme = 'dark' | 'light'

/**
 * El tema real ya se aplicó en el `<head>` antes del primer paint (ver index.html);
 * aquí solo se sincroniza el estado de React con lo que ya está en el DOM.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0a0a12' : '#f8f8fb')
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggle = useCallback(() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')), [])

  return { theme, toggle }
}
