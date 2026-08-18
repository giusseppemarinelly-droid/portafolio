import { useMemo, useState } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import { projects } from '../data/projects'
import type { Project, ProjectStatus } from '../data/types'
import { ArchPath } from './ArchDiagram'
import { ArrowIcon, ExternalIcon } from './Icons'
import { ProjectDialog } from './ProjectDialog'
import { Section } from './Section'
import { StatusBadge } from './StatusBadge'

type Filter = 'all' | ProjectStatus

const FILTERS: Filter[] = ['all', 'production', 'active', 'academic']
const VISIBLE_STACK = 5

export function Work() {
  const { t, locale } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.status === filter)),
    [filter],
  )
  const open = projects.find((p) => p.id === openId) ?? null

  return (
    <>
      <Section
        id="work"
        no="03"
        label={t.work.label}
        heading={t.work.heading}
        lede={t.work.lede}
        aside={
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={t.work.label}>
            {FILTERS.map((f) => {
              const count = f === 'all' ? projects.length : projects.filter((p) => p.status === f).length
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                    filter === f
                      ? 'border-accent bg-accent text-accent-ink'
                      : 'border-line text-muted hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {f === 'all' ? t.work.filterAll : t.work.status[f]}
                  <span className="font-mono text-[0.6rem] opacity-60">{count}</span>
                </button>
              )
            })}
          </div>
        }
      >
        <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-2">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </ul>
      </Section>

      {open && <ProjectDialog key={`${open.id}-${locale}`} project={open} onClose={() => setOpenId(null)} />}
    </>
  )
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const { t, locale } = useI18n()
  const c = project.copy[locale]
  const extra = project.stack.length - VISIBLE_STACK

  return (
    <li
      className="group relative flex flex-col bg-bg p-6 transition-colors duration-500 hover:bg-surface md:p-8"
      data-reveal
      style={{ ['--reveal-delay' as string]: `${(index % 2) * 90}ms` }}
    >
      {/* Filo de acento que se dibuja de izquierda a derecha al pasar el cursor. */}
      <span
        className="absolute inset-x-0 top-0 h-px w-0 bg-accent transition-[width] duration-500 ease-out group-hover:w-full"
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-muted">{project.no}</span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="mt-5 text-[1.6rem] leading-tight text-ink transition-colors group-hover:text-accent md:text-[1.75rem]">
        {c.title}
      </h3>
      <p className="mt-2 font-mono text-[0.7rem] leading-relaxed text-muted">{c.context}</p>

      <p className="mt-4 max-w-prose text-[0.94rem] leading-relaxed text-ink-soft">{c.summary}</p>

      {/* Solo la forma del sistema; los nombres concretos van en la ficha. */}
      <div className="mt-6 border-y border-line py-3">
        <ArchPath nodes={project.arch} />
      </div>

      <ul className="mt-6 mb-7 flex flex-wrap gap-1.5">
        {project.stack.slice(0, VISIBLE_STACK).map((tech) => (
          <li key={tech}>
            <span className="chip">{tech}</span>
          </li>
        ))}
        {extra > 0 && (
          <li>
            <span className="chip border-dashed">+{extra}</span>
          </li>
        )}
      </ul>

      {/* mt-auto ancla el pie al fondo: todas las tarjetas de una fila rematan a la misma altura.
          El margen inferior de la lista de arriba garantiza la separación mínima. */}
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
        {/* El botón cubre toda la tarjeta: cualquier clic abre la ficha. */}
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink after:absolute after:inset-0 after:content-['']"
        >
          {t.work.open}
          <ArrowIcon className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-muted transition-colors hover:text-accent"
          >
            {project.link.label}
            <ExternalIcon className="size-3.5" />
          </a>
        )}
      </div>
    </li>
  )
}
