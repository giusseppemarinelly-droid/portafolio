import { useEffect } from 'react'

const REVEAL_ATTR = 'data-reveal'
const DONE_ATTR = 'data-revealed'

/**
 * Revela los elementos marcados con `data-reveal` al entrar en pantalla.
 *
 * Un único observador para toda la página en vez de uno por componente, y se
 * desconecta de cada nodo en cuanto ya se mostró — la animación no debe volver
 * a dispararse al desplazarse hacia arriba.
 *
 * Un `MutationObserver` engancha además los nodos que aparecen después del
 * primer render (al filtrar los proyectos, al abrir una ficha); sin él esos
 * elementos se quedarían invisibles para siempre, porque nadie los observa.
 */
export function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const unsupported = !('IntersectionObserver' in window)

    const revealNow = (node: Element) => node.setAttribute(DONE_ATTR, 'true')

    if (reduced || unsupported) {
      document.querySelectorAll(`[${REVEAL_ATTR}]`).forEach(revealNow)
      // Los que lleguen después también deben quedar visibles de inmediato.
      const mo = new MutationObserver(() =>
        document.querySelectorAll(`[${REVEAL_ATTR}]:not([${DONE_ATTR}])`).forEach(revealNow),
      )
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          revealNow(entry.target)
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )

    const register = () =>
      document
        .querySelectorAll(`[${REVEAL_ATTR}]:not([${DONE_ATTR}])`)
        .forEach((node) => io.observe(node))

    register()

    const mo = new MutationObserver(register)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [])
}

/** Marca en la navegación la sección visible en pantalla. */
export function useActiveSection(ids: readonly string[], onChange: (id: string) => void) {
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) onChange(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids, onChange])
}
