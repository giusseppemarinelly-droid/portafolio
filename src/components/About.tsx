import { useI18n } from '../i18n/LanguageProvider'
import { Section } from './Section'

export function About() {
  const { t } = useI18n()

  return (
    <Section id="about" no="01" label={t.about.label} heading={t.about.heading}>
      <div className="grid gap-12 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <div className="space-y-6">
            {t.about.body.map((paragraph, i) => (
              <p
                key={i}
                className={`leading-relaxed ${
                  i === 0
                    ? 'font-display text-[1.35rem] leading-snug tracking-tight text-ink md:text-[1.5rem]'
                    : 'text-[0.975rem] text-ink-soft'
                }`}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Ficha de datos: la información que un reclutador busca primero,
            sin obligarle a extraerla del texto corrido. */}
        <aside className="md:col-span-5 md:pl-4">
          <dl className="divide-y divide-line border-y border-line">
            {t.about.facts.map((fact, i) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 py-3.5"
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 55}ms` }}
              >
                <dt className="eyebrow shrink-0">{fact.label}</dt>
                <dd className="text-right text-sm leading-snug text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
        {t.about.metrics.map((metric, i) => (
          <div
            key={metric.label}
            className="bg-bg px-5 py-6"
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}
          >
            <dt className="sr-only">{metric.label}</dt>
            <dd>
              <span className="block font-display text-4xl font-medium tracking-tighter text-accent md:text-5xl">
                {metric.value}
              </span>
              <span className="mt-2 block text-xs leading-snug text-muted">{metric.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
