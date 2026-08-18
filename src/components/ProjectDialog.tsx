import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import type { Project } from '../data/types'
import { ArchDiagram } from './ArchDiagram'
import { CloseIcon, ExternalIcon } from './Icons'
import { StatusBadge } from './StatusBadge'

interface Props {
  project: Project
  onClose: () => void
}

/**
 * Ficha ampliada del proyecto.
 *
 * El panel tiene altura fija y su propio scroll interno, en vez de dejar que
 * se desplace la página entera bajo una cabecera translúcida: así el título
 * nunca se solapa con el texto ni se ve medio cortado al hacer scroll.
 */
export function ProjectDialog({ project, onClose }: Props) {
  const { t, locale } = useI18n()
  const c = project.copy[locale]
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Ciclo de tabulación acotado al diálogo: nada del fondo debe recibir foco.
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-stretch justify-center bg-bg-deep/80 backdrop-blur-md md:items-center md:p-6 lg:p-10"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="animate-dialog flex h-full w-full max-w-3xl flex-col overflow-hidden border-line bg-bg md:h-auto md:max-h-[86vh] md:rounded-lg md:border md:shadow-2xl"
      >
        {/* Cabecera: opaca y fuera del área de scroll, no flota sobre el texto. */}
        <header className="relative z-10 flex shrink-0 items-start justify-between gap-4 border-b border-line bg-bg px-6 py-5 md:px-9 md:py-6">
          <div className="min-w-0">
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-accent">{project.no}</span>
              <span className="h-px w-6 bg-line-strong" />
              <span>{project.year}</span>
            </p>
            <h3
              id="project-dialog-title"
              className="mt-2.5 text-[clamp(1.35rem,3.2vw,1.95rem)] leading-tight"
            >
              {c.title}
            </h3>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
              <StatusBadge status={project.status} />
              <span className="font-mono text-[0.68rem] leading-relaxed text-muted">
                {c.context}
              </span>
            </p>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.work.close}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent"
          >
            <CloseIcon />
          </button>
        </header>

        {/* Cuerpo: el único elemento con scroll.
            Tiene que ser él mismo el item flexible (`flex-1 min-h-0`). Envolverlo en
            otro div y darle `h-full` rompe la cadena de alturas cuando el panel usa
            `max-height` en vez de `height`: el 100% no resuelve, el área crece hasta
            el alto del contenido y deja de poder desplazarse. */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-7 [scrollbar-gutter:stable] md:px-9 md:py-9">
          <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink">{c.summary}</p>

          <div className="mt-9 space-y-9">
            <Block title={t.work.sections.arch}>
              <ArchDiagram nodes={project.arch} />
            </Block>

            <Block title={t.work.sections.challenge}>
              <p className="leading-relaxed text-ink-soft">{c.challenge}</p>
            </Block>

            <Block title={t.work.sections.solution}>
              <ul className="space-y-3.5">
                {c.solution.map((item, i) => (
                  <li key={i} className="flex gap-3.5 leading-relaxed text-ink-soft">
                    <span
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title={t.work.sections.impact}>
              <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
                {c.impact.map((item, i) => (
                  <li key={i} className="bg-bg px-4 py-4 text-sm leading-relaxed text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title={t.work.sections.role}>
              <p className="text-ink-soft">{c.role}</p>
            </Block>

            <Block title={t.work.sections.stack}>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <span className="chip">{tech}</span>
                  </li>
                ))}
              </ul>
          </Block>
          </div>
        </div>

        {/* Pie fijo: el enlace del proyecto siempre a la vista, sin buscarlo. */}
        <footer className="relative z-10 flex shrink-0 items-center justify-between gap-4 border-t border-line bg-bg px-6 py-4 md:px-9">
          {project.link ? (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary !py-2.5 !text-sm"
            >
              {t.work.visit}
              <ExternalIcon className="size-4" />
            </a>
          ) : (
            <p className="font-mono text-[0.7rem] text-muted">{t.work.privateNote}</p>
          )}

          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
          >
            {t.work.close}
          </button>
        </footer>
      </div>
    </div>
  )
}

/** Etiqueta a la izquierda en escritorio, encima en móvil. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-2.5 border-t border-line pt-7 first:border-0 first:pt-0 md:grid-cols-[7.5rem_1fr] md:gap-8">
      <h4 className="eyebrow md:pt-1">{title}</h4>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
