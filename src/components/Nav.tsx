import { useCallback, useEffect, useState } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useReveal'
import { profile } from '../data/copy'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons'

const SECTION_IDS = ['about', 'stack', 'work', 'path', 'contact'] as const
type SectionId = (typeof SECTION_IDS)[number]

/** Referencia estable: si se recreara en cada render, el observador de sección
 *  se desmontaría y volvería a montarse con cada scroll. */
const SECTION_ID_LIST: readonly string[] = SECTION_IDS

export function Nav() {
  const { t, locale, setLocale } = useI18n()
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useActiveSection(SECTION_ID_LIST, setActive)

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

  const go = useCallback((id: SectionId) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-line bg-bg/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/65'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-4 md:h-18">
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
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
        <ul className="shell flex h-full flex-col justify-center gap-2">
          {SECTION_IDS.map((id, i) => (
            <li key={id} style={{ ['--enter-delay' as string]: `${i * 45}ms` }} className={open ? 'animate-enter' : ''}>
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
