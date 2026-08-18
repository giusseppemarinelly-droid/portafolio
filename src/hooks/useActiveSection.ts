import { useEffect } from 'react'

/**
 * Marca en la navegación la sección visible en pantalla.
 *
 * Vivía en `useReveal.ts` junto al revelado por scroll; ese revelado lo lleva
 * ahora Anime.js (`useAnime.ts`) y aquí queda lo único que seguía haciendo el
 * archivo. La banda de detección es la franja central del viewport —el margen
 * recorta un 45 % por arriba y otro tanto por abajo— para que la sección activa
 * cambie cuando de verdad estás mirándola, no en cuanto asoma por el borde.
 */
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
