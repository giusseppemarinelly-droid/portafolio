import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import type { ReactNode } from 'react'

/**
 * Enrutado mínimo sobre la History API.
 *
 * Son dos formas de URL —la portada y la ficha de un proyecto— y no justifican
 * una librería de rutas con su propio peso: lo que sí hace falta es controlar el
 * momento exacto del cambio de vista, porque la transición entre páginas se
 * apoya en la View Transitions API y esa exige que el DOM cambie *dentro* de su
 * callback. Con un router de terceros ese punto queda fuera de mi alcance.
 *
 * `morphId` recuerda de qué proyecto se viene o se va, para que el icono de la
 * tarjeta y el de la ficha compartan `view-transition-name` y el navegador los
 * interpole como un mismo objeto en lugar de fundirlos.
 */

interface RouterValue {
  path: string
  morphId: string | null
  navigate: (to: string, options?: { morphId?: string | null }) => void
}

const RouterContext = createContext<RouterValue | null>(null)

type DocumentWithVT = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> }
}

/**
 * Aplica el cambio de ruta dentro de una transición de vista si el navegador la
 * soporta.
 *
 * Dos cosas tienen que pasar dentro del callback, y en este orden:
 *
 * 1. `flushSync`. React agrupa las actualizaciones de estado y las aplica más
 *    tarde, así que sin él el callback terminaría antes de que el DOM hubiese
 *    cambiado y el navegador compararía dos fotogramas idénticos — la transición
 *    se ejecutaría sin que se viese nada.
 * 2. El scroll al principio de la página. Si se reinicia *después*, el navegador
 *    ya ha fotografiado la vista nueva a la altura que tenía la portada y se ve
 *    un salto en cuanto acaba la transición.
 */
function applyRoute(update: () => void, resetScroll: boolean) {
  const doc = document as DocumentWithVT
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const commit = () => {
    update()
    if (resetScroll) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

  if (typeof doc.startViewTransition !== 'function' || reduced) {
    commit()
    return
  }

  doc.startViewTransition(() => {
    flushSync(update)
    if (resetScroll) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  })
}

export function Router({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname)
  const [morphId, setMorphId] = useState<string | null>(null)

  const navigate = useCallback<RouterValue['navigate']>((to, options) => {
    if (to === window.location.pathname) return

    window.history.pushState({}, '', to)
    applyRoute(() => {
      if (options && 'morphId' in options) setMorphId(options.morphId ?? null)
      setPath(to)
    }, true)
  }, [])

  useEffect(() => {
    // Atrás y adelante del navegador. `morphId` se deja intacto: al volver a la
    // portada sigue apuntando al proyecto que se estaba viendo, que es
    // justamente la tarjeta con la que debe emparejarse la transición.
    // Sin reinicio de scroll: al volver atrás, la posición la restaura el
    // navegador, y pisarla dejaría la portada arriba en vez de donde se estaba.
    const onPop = () => {
      applyRoute(() => setPath(window.location.pathname), false)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const value = useMemo<RouterValue>(() => ({ path, morphId, navigate }), [path, morphId, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter debe usarse dentro de <Router>')
  return ctx
}

/**
 * Enlace interno. Es una etiqueta `<a>` de verdad, con su `href`, para que el
 * clic con la rueda o con Ctrl abra la pestaña nueva y el navegador muestre el
 * destino en la barra de estado; solo se intercepta el clic normal.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function Link({
  to,
  morphId,
  className,
  children,
  onNavigate,
}: {
  to: string
  morphId?: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
}) {
  const { navigate } = useRouter()

  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
          return
        }
        e.preventDefault()
        onNavigate?.()
        navigate(to, { morphId: morphId ?? null })
      }}
    >
      {children}
    </a>
  )
}

/** `/proyectos/inventario` → `inventario`. Devuelve `null` en cualquier otra ruta. */
export function projectIdFromPath(path: string): string | null {
  const match = /^\/proyectos\/([A-Za-z0-9-]+)\/?$/.exec(path)
  return match ? match[1] : null
}
