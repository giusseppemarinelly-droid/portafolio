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
        <p className="eyebrow flex items-center gap-2.5" data-intro>
          <span className="relative grid size-2 place-items-center">
            <span className="animate-live absolute inset-0 rounded-full bg-cool" />
          </span>
          {t.meta.availability}
        </p>

        {/* Titular en un solo tono: el color vive en los controles y las cifras,
            no en media frase.

            Cada línea va dentro de una máscara con `overflow-hidden` para que
            pueda subir desde debajo de su propia caja. El relleno inferior con
            margen negativo que lo compensa está ahí porque, con `leading` por
            debajo de 1, la máscara le cortaría la cola a la «g» y la «y». */}
        <h1 className="mt-7 max-w-5xl text-[clamp(2.5rem,7.4vw,5.5rem)] leading-[0.94]">
          <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
            <span className="block" data-intro-line>
              {t.hero.titleTop}
            </span>
          </span>
          <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
            <span className="block text-muted" data-intro-line>
              {t.hero.titleBottom}
            </span>
          </span>
        </h1>

        <p
          className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft md:text-lg"
          data-intro
        >
          {t.hero.lede}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3" data-intro>
          <button type="button" onClick={() => scrollTo('work')} className="btn-primary group">
            {t.hero.ctaWork}
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button type="button" onClick={() => scrollTo('contact')} className="btn-ghost">
            {t.hero.ctaContact}
          </button>
        </div>

        {/* Cabecera de datos: quién, dónde y cuánto hay construido. */}
        <dl
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 md:mt-20 md:grid-cols-4"
          data-intro
        >
          {[
            { k: locale === 'es' ? 'Rol' : 'Role', v: t.meta.role },
            { k: locale === 'es' ? 'Base' : 'Based in', v: profile.location[locale] },
            {
              k: locale === 'es' ? 'En producción' : 'In production',
              v: `${inProduction} ${locale === 'es' ? 'sistemas' : 'systems'}`,
            },
            {
              k: locale === 'es' ? 'Formación' : 'Studying',
              v: locale === 'es' ? 'Ing. en Computación' : 'Computer Engineering',
            },
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
          className="mt-10 hidden items-center gap-2 self-start font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink md:inline-flex"
          data-intro
        >
          <ArrowDownIcon className="size-3.5" />
          {t.hero.scroll}
        </button>
      </div>
    </section>
  )
}
