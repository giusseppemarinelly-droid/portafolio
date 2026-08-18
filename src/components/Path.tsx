import { useI18n } from '../i18n/LanguageProvider'
import { timeline } from '../data/copy'
import { Section } from './Section'
import { TechChip } from './TechIcon'

export function Path() {
  const { t, locale } = useI18n()

  return (
    <Section id="path" no="04" label={t.path.label} heading={t.path.heading} lede={t.path.lede}>
      <ol className="relative border-l border-line pl-6 md:pl-10" data-reveal-stagger>
        {timeline.map((entry, i) => {
          const c = entry.copy[locale]
          return (
            <li key={entry.id} className="relative pb-12 last:pb-0">
              {/* Marca del hito, centrada sobre la línea vertical. */}
              <span
                className="absolute -left-[1.65rem] top-1.5 grid size-3 place-items-center rounded-full border border-line-strong bg-bg md:-left-[2.65rem]"
                aria-hidden="true"
              >
                <span className={`size-1.5 rounded-full ${i === 0 ? 'bg-accent' : 'bg-muted'}`} />
              </span>

              <p className="eyebrow">{entry.period[locale]}</p>

              <h3 className="mt-3 text-2xl leading-tight text-ink md:text-[1.75rem]">{c.title}</h3>
              <p className="mt-1.5 text-sm text-accent">{c.place}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{c.detail}</p>

              {entry.tags && (
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <li key={tag}>
                      <TechChip name={tag} fallback="none" />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
