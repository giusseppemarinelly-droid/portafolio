import { useI18n } from '../i18n/LanguageProvider'
import { stackGroups } from '../data/stack'
import { Section } from './Section'

export function StackSection() {
  const { t, locale } = useI18n()

  return (
    <Section
      id="stack"
      no="02"
      label={t.stack.label}
      heading={t.stack.heading}
      lede={t.stack.lede}
      aside={
        <p className="mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          <span className="inline-block size-2 rounded-full bg-accent" />
          {t.stack.coreNote}
        </p>
      }
    >
      <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
        {stackGroups.map((group, i) => (
          <article
            key={group.id}
            className="flex flex-col bg-bg p-6 md:p-8"
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
          >
            <header className="flex items-baseline justify-between gap-4">
              <h3 className="font-sans text-base font-medium tracking-tight text-ink">
                {group.label[locale]}
              </h3>
              <span className="font-mono text-[0.65rem] text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
            </header>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{group.note[locale]}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item.name}>
                  <span className={`chip ${item.level === 'core' ? 'chip-core' : ''}`}>
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
