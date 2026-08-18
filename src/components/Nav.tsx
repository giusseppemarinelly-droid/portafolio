import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, stagger, utils } from 'animejs'
import { useI18n } from '../i18n/LanguageProvider'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'
import { useRouter } from '../router/Router'
import { profile } from '../data/copy'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons'

const SECTION_IDS = ['about', 'stack', 'work', 'path', 'contact'] as const
type SectionId = (typeof SECTION_IDS)[number]

/** Referencias estables: si se recrearan en cada render, el observador de
 *  sección se desmontaría y volvería a montarse con cada scroll. */
const SECTION_ID_LIST: readonly string[] = SECTION_IDS
const EMPTY_IDS: readonly string[] = []

export function Nav() {
  const { t, locale, setLocale } = useI18n()
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  const menuRef = useRef<HTMLUListElement>(null)
  const { path, navigate } = useRouter()
  const onHome = path === '/'

  // Fuera de la portada no hay secciones que observar, y dejar el observador
  // activo marcaría como activa la última sección vista antes de salir.
  useActiveSection(onHome ? SECTION_ID_LIST : EMPTY_IDS, setActive)

  /**
   * Entrada escalonada de las opciones del menú móvil.
   *
   * Al cerrarlo vuelven a opacidad cero aunque no se vean: la capa que las
   * contiene se desvanece con una transición CSS, y si las opciones se quedaran
   * visibles, la siguiente apertura las mostraría ya puestas antes de animarlas.
   */
  useEffect(() => {
    const list = menuRef.current
    if (!list) return
    const items = Array.from(list.children) as HTMLElement[]
    if (items.length === 0) return

    if (!open) {
      utils.set(items, { opacity: 0 })
      return
    }

    animate(items, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 620,
      ease: 'out(3)',
      delay: stagger(55),
    })
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Con el menú móvil abierto, la página de atrás no debe desplazarse.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /**
   * Salta a una sección de la portada.
   *
   * Desde la ficha de un proyecto esas secciones no están en el documento, así
   * que primero hay que volver a la portada y solo después desplazarse. El
   * `requestAnimationFrame` doble no es superstición: uno espera a que React
   * pinte la portada y el otro a que el navegador la haya maquetado — sin la
   * segunda espera, `scrollIntoView` mide un documento que aún no tiene la
   * altura definitiva y se queda corto.
   */
  const go = useCallback(
    (id: SectionId) => {
      setOpen(false)

      const scrollToSection = () =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

      if (onHome) {
        scrollToSection()
        return
      }

      navigate('/')
      requestAnimationFrame(() => requestAnimationFrame(scrollToSection))
    },
    [onHome, navigate],
  )

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <header
        style={{ viewTransitionName: 'site-nav' } as React.CSSProperties}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-line bg-bg/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/65'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-4 md:h-18">
          {/* Desde una ficha, la firma vuelve a la portada; en la portada solo
              sube arriba. En los dos casos el `href` apunta a «/» para que el
              enlace siga funcionando con Ctrl+clic y sin JavaScript. */}
          <a
            href="/"
            className="group flex items-center gap-2.5"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
              e.preventDefault()
              if (onHome) window.scrollTo({ top: 0, behavior: 'smooth' })
              else navigate('/')
            }}
          >
            <span className="grid size-8 place-items-center rounded-full border border-line-strong font-mono text-[0.7rem] tracking-wider text-ink transition-colors group-hover:border-accent group-hover:text-accent">
              {profile.initials}
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-ink sm:block">
              {profile.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => go(id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active === id ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {active === id && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-surface-2 ring-1 ring-line" />
                  )}
                  {t.nav[id]}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center rounded-full border border-line p-0.5"
              role="group"
              aria-label={t.a11y.toggleLang}
            >
              {(['es', 'en'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  aria-pressed={locale === code}
                  className={`rounded-full px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest transition-colors ${
                    locale === code
                      ? 'bg-ink text-bg'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={toggle}
              aria-label={t.a11y.toggleTheme}
              className="grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={t.a11y.menu}
              aria-expanded={open}
              className="grid size-9 place-items-center rounded-full border border-line text-ink md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil a pantalla completa */}
      <div
        className={`fixed inset-0 z-40 bg-bg transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul ref={menuRef} className="shell flex h-full flex-col justify-center gap-2">
          {SECTION_IDS.map((id, i) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                className="flex w-full items-baseline gap-4 border-b border-line py-4 text-left"
              >
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <span className="font-display text-3xl text-ink">{t.nav[id]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
