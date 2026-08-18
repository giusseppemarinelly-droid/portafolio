import { useI18n } from '../i18n/LanguageProvider'
import type { ProjectStatus } from '../data/types'

/** Verde = corriendo (la convención de «está vivo»), cobalto = en construcción,
 *  arena = trabajo de la carrera. */
const tone: Record<ProjectStatus, string> = {
  production: 'border-cool/40 bg-cool-soft text-cool',
  active: 'border-accent/40 bg-accent-soft text-accent',
  academic: 'border-clay/40 bg-clay-soft text-clay',
}

const dot: Record<ProjectStatus, string> = {
  production: 'bg-cool',
  active: 'bg-accent',
  academic: 'bg-clay',
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { t } = useI18n()

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] ${tone[status]}`}
    >
      <span
        className={`size-1.5 rounded-full ${dot[status]} ${status === 'production' ? 'animate-live' : ''}`}
        aria-hidden="true"
      />
      {t.work.status[status]}
    </span>
  )
}
