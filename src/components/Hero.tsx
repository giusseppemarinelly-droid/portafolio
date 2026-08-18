import { useI18n } from '../i18n/LanguageProvider'
import { profile } from '../data/copy'
import { projects } from '../data/projects'
import { ArrowDownIcon, ArrowIcon } from './Icons'

const inProduction = projects.filter((p) => p.status === 'production').length

export function Hero() {
  const { t, locale } = useI18n()

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section
      id="top"
      className="relative flex flex-col justify-center overflow-hidden pt-28 pb-16 md:min-h-svh md:pt-32 md:pb-14"
    >
      <div className="grid-veil pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden="true" />

      <div className="shell w-full">
        <p
          className="eyebrow animate-enter flex items-center gap-2.5"
          style={{ ['--enter-delay' as string]: '80ms' }}
        >
          <span className="relative grid size-2 place-items-center">
            <span className="animate-live absolute inset-0 rounded-full bg-cool" />
          </span>
          {t.meta.availability}
        </p>

        {/* Titular en un solo tono: el color vive en los controles y las cifras,
            no en media frase. */}
        <h1 className="mt-7 max-w-5xl text-[clamp(2.5rem,7.4vw,5.5rem)] leading-[0.94]">
          <span className="animate-enter block" style={{ ['--enter-delay' as string]: '160ms' }}>
            {t.hero.titleTop}
          </span>
          <span
            className="animate-enter block text-muted"
            style={{ ['--enter-delay' as string]: '260ms' }}
          >
            {t.hero.titleBottom}
          </span>
        </h1>

        <p
          className="animate-enter mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft md:text-lg"
          style={{ ['--enter-delay' as string]: '380ms' }}
        >
          {t.hero.lede}
        </p>

        <div
          className="animate-enter mt-10 flex flex-wrap items-center gap-3"
          style={{ ['--enter-delay' as string]: '470ms' }}
        >
          <button
            type="button"
            onClick={() => scrollTo('work')}
            className="btn-primary group"
          >
            {t.hero.ctaWork}
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="btn-ghost"
          >
            {t.hero.ctaContact}
          </button>
        </div>

        {/* Cabecera de datos: quién, dónde y cuánto hay construido. */}
        <dl
          className="animate-enter mt-16 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 md:mt-20 md:grid-cols-4"
          style={{ ['--enter-delay' as string]: '560ms' }}
        >
          {[
            { k: locale === 'es' ? 'Rol' : 'Role', v: t.meta.role },
            { k: locale === 'es' ? 'Base' : 'Based in', v: profile.location[locale] },
            {
              k: locale === 'es' ? 'En producción' : 'In production',
              v: `${inProduction} ${locale === 'es' ? 'sistemas' : 'systems'}`,
            },
            { k: locale === 'es' ? 'Formación' : 'Studying', v: locale === 'es' ? 'Ing. en Computación' : 'Computer Engineering' },
          ].map((item) => (
            <div key={item.k}>
              <dt className="eyebrow">{item.k}</dt>
              <dd className="mt-1.5 text-sm text-ink">{item.v}</dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={() => scrollTo('about')}
          className="animate-enter mt-10 hidden items-center gap-2 self-start font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink md:inline-flex"
          style={{ ['--enter-delay' as string]: '680ms' }}
        >
          <ArrowDownIcon className="size-3.5" />
          {t.hero.scroll}
        </button>
      </div>
    </section>
  )
}
