import { useEffect, useLayoutEffect } from 'react'
import { animate, createTimeline, onScroll, stagger, utils } from 'animejs'

/**
 * Capa de animación del sitio, sobre Anime.js.
 *
 * Hay cuatro gestos, y el reparto entre ellos es deliberado:
 *
 * - `data-rise` — el contenido sube desde detrás de una máscara. Es el más
 *   llamativo y se reserva para titulares (ver el componente `Rise`).
 * - `data-reveal-stagger` — los hijos directos entran en cascada cuando el
 *   contenedor asoma. Para rejillas y listas.
 * - `data-reveal` — entrada simple, para elementos sueltos.
 * - `data-parallax` — desplazamiento ligado al scroll, no disparado por él.
 *
 * Los recorridos son cortos y las duraciones largas, con curvas que frenan
 * fuerte al final (`outExpo`, `outQuint`). Es al contrario de lo que parece:
 * mover un elemento 40 px en 400 ms se ve brusco y barato; moverlo 14 px en
 * 1000 ms se lee como peso y materia.
 *
 * Todo el estado inicial se fija en `useLayoutEffect`, antes del primer pintado:
 * en `useEffect` el navegador ya habría pintado el contenido y se vería un
 * parpadeo al ocultarlo. Y nada se oculta desde CSS a propósito — si el paquete
 * de JS no llegara a cargar, la página se queda visible y legible en lugar de
 * quedarse en blanco para siempre.
 */

const READY = 'data-anim-ready'

/** Consulta al DOM con la API del navegador, no con el ayudante de Anime.js:
 *  una dependencia menos en la parte que decide si el contenido llega a verse. */
function $$(selector: string, root: ParentNode = document): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(selector))
}

function prefersReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Marca el nodo y devuelve `false` si ya estaba procesado. */
function claim(el: Element) {
  if (el.hasAttribute(READY)) return false
  el.setAttribute(READY, '')
  return true
}

/**
 * Entrada del héroe de la portada, encadenada en una línea de tiempo.
 *
 * El titular no se parte en palabras con `splitText`: envolver cada palabra en
 * un `inline-block` cambia dónde corta la línea, y el titular usa `clamp()` y
 * `text-wrap: balance` — el reparto en dos líneas es parte del diseño. Animar
 * la línea completa tras una máscara da el mismo efecto sin tocar el texto.
 */
export function useHeroIntro() {
  useLayoutEffect(() => {
    const lines = $$('[data-intro-line]')
    const items = $$('[data-intro]')
    if (lines.length === 0 && items.length === 0) return

    if (prefersReduced()) {
      utils.set([...lines, ...items], { opacity: 1, translateY: 0 })
      return
    }

    utils.set(lines, { translateY: '110%' })
    utils.set(items, { opacity: 0, translateY: 16 })

    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
    tl.add(lines, { translateY: '0%', duration: 1250, delay: stagger(120) }, 120)
    tl.add(items, { opacity: 1, translateY: 0, duration: 900, delay: stagger(80) }, 460)

    return () => {
      tl.pause()
    }
  }, [])
}

/**
 * Revelados y desplazamientos ligados al scroll.
 *
 * `key` fuerza a reprocesar al cambiar de página: el marcador `data-anim-ready`
 * viaja en el DOM, y sin reinicio los nodos de la ficha nueva heredarían la
 * marca de la anterior y se quedarían con el estado inicial puesto.
 *
 * El `MutationObserver` engancha además lo que aparece después del primer
 * render, como las tarjetas que entran al cambiar de filtro.
 */
export function useScrollReveals(key: string = '') {
  useLayoutEffect(() => {
    const reduced = prefersReduced()

    const process = () => {
      // Titulares tras máscara.
      $$('[data-rise]').forEach((el) => {
        if (!claim(el)) return
        if (reduced) return

        utils.set(el, { translateY: '110%' })
        animate(el, {
          translateY: '0%',
          duration: 1200,
          ease: 'outExpo',
          autoplay: onScroll({ target: el, enter: 'bottom-=40 top', repeat: false }),
        })
      })

      // Los grupos van antes que los elementos sueltos: así marcan a sus hijos
      // como procesados y un hijo que además lleve `data-reveal` no se anima
      // dos veces, peleándose consigo mismo por la misma propiedad.
      $$('[data-reveal-stagger]').forEach((group) => {
        if (!claim(group)) return
        const kids = Array.from(group.children) as HTMLElement[]
        kids.forEach((kid) => kid.setAttribute(READY, ''))
        if (reduced || kids.length === 0) return

        utils.set(kids, { opacity: 0, translateY: 20, scale: 0.985 })
        animate(kids, {
          opacity: 1,
          translateY: 0,
          scale: 1,
          duration: 1000,
          ease: 'outQuint',
          delay: stagger(80),
          autoplay: onScroll({ target: group, enter: 'bottom-=70 top', repeat: false }),
        })
      })

      $$('[data-reveal]').forEach((el) => {
        if (!claim(el)) return
        if (reduced) return

        utils.set(el, { opacity: 0, translateY: 14 })
        animate(el, {
          opacity: 1,
          translateY: 0,
          duration: 1000,
          ease: 'outQuint',
          autoplay: onScroll({ target: el, enter: 'bottom-=50 top', repeat: false }),
        })
      })

      // Paralaje: el recorrido va atado a la posición del scroll (`sync`), no
      // disparado una vez al entrar.
      $$('[data-parallax]').forEach((el) => {
        if (!claim(el)) return
        if (reduced) return
        const distance = Number(el.dataset.parallax) || 40

        animate(el, {
          translateY: [0, distance],
          ease: 'linear',
          autoplay: onScroll({
            target: el,
            sync: true,
            enter: 'top top',
            leave: 'bottom top',
          }),
        })
      })
    }

    process()
    const mo = new MutationObserver(process)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [key])
}

/**
 * Cuenta las cifras desde cero al entrar en pantalla.
 *
 * El valor final se lee de `data-count` y no del texto del nodo: el texto se
 * sobrescribe en cada fotograma, así que si fuera la fuente del objetivo se
 * perdería en cuanto arrancara la animación.
 */
export function useCounters() {
  useLayoutEffect(() => {
    if (prefersReduced()) return

    $$('[data-count]').forEach((el) => {
      if (!claim(el)) return
      const target = Number(el.dataset.count)
      if (!Number.isFinite(target)) return

      const state = { n: 0 }
      el.textContent = '0'

      animate(state, {
        n: target,
        duration: 1600,
        ease: 'out(4)',
        onUpdate: () => {
          el.textContent = String(Math.round(state.n))
        },
        autoplay: onScroll({ target: el, enter: 'bottom-=40 top', repeat: false }),
      })
    })
  }, [])
}

/**
 * Barra de progreso de lectura, fijada arriba.
 *
 * Va con un oyente de scroll propio en vez de con el `onScroll` de Anime.js
 * porque lo que mide no es un elemento entrando en pantalla, sino el avance del
 * documento completo — y eso es una división, no una animación. El valor se
 * escribe dentro de `requestAnimationFrame` para no tocar el estilo más de una
 * vez por fotograma aunque lleguen decenas de eventos.
 */
export function useReadingProgress(selector: string) {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(selector)
    if (!bar) return

    let queued = false
    const paint = () => {
      queued = false
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const ratio = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0
      bar.style.transform = `scaleX(${ratio})`
    }

    const onScrollEvent = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', onScrollEvent, { passive: true })
    window.addEventListener('resize', onScrollEvent)
    return () => {
      window.removeEventListener('scroll', onScrollEvent)
      window.removeEventListener('resize', onScrollEvent)
    }
  }, [selector])
}
