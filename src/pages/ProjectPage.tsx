import type { ReactNode } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import { projects } from '../data/projects'
import type { Project } from '../data/types'
import { ArchDiagram } from '../components/ArchDiagram'
import { ArrowIcon, ExternalIcon } from '../components/Icons'
import { Rise } from '../components/Motion'
import { StatusBadge } from '../components/StatusBadge'
import { TechIcon } from '../components/TechIcon'
import { Link } from '../router/Router'

/**
 * Ficha completa del proyecto, como página propia.
 *
 * Antes era un diálogo modal encima de la portada. El problema no era el diseño
 * del diálogo sino su formato: un caso de estudio con reto, ocho pasos de
 * construcción, diagrama de arquitectura y resultados no cabe en una ventana
 * flotante con scroll interno, y presentarlo así le resta importancia a lo que
 * es el contenido más valioso del portafolio. Con página propia hay sitio para
 * la retícula editorial de dos columnas, cada capítulo respira, y además el
 * proyecto gana URL: se puede enlazar en un correo o en una candidatura.
 */

/** Icono grande de la aplicación, o el número del proyecto si no tiene. */
function ProjectMark({ project, title }: { project: Project; title: string }) {
  // El nombre de transición empareja este icono con el de la tarjeta de la
  // portada, para que el navegador interpole uno en el otro al cambiar de página
  // en lugar de fundir las dos pantallas enteras.
  const style = { viewTransitionName: 'project-mark' } as React.CSSProperties

  if (!project.logo) {
    return (
      <span
        className="project-logo grid size-20 shrink-0 place-items-center font-mono text-xl text-muted md:size-24"
        style={style}
      >
        {project.no}
      </span>
    )
  }

  return (
    <span className="project-logo grid size-20 shrink-0 place-items-center md:size-24" style={style}>
      <img
        src={project.logo}
        alt={title}
        width={96}
        height={96}
        className="size-full object-cover"
      />
    </span>
  )
}

/**
 * Capítulo de la ficha: número y título en una columna estrecha, contenido en el
 * resto. La etiqueta queda pegada al hacer scroll, así que en los capítulos
 * largos siempre se sabe qué se está leyendo.
 */
function Chapter({
  no,
  title,
  children,
  wide = false,
}: {
  no: string
  title: string
  children: ReactNode
  wide?: boolean
}) {
  return (
    <section className="border-b border-line py-14 md:py-20">
      <div className="shell grid gap-7 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-3">
          <p className="eyebrow flex items-center gap-3 md:sticky md:top-28" data-reveal>
            <span className="text-accent">{no}</span>
            <span className="h-px w-6 bg-line-strong" />
            {title}
          </p>
        </div>
        <div className={`md:col-span-9 ${wide ? '' : 'md:max-w-3xl'}`}>{children}</div>
      </div>
    </section>
  )
}

export function ProjectPage({ project }: { project: Project }) {
  const { t, locale } = useI18n()
  const c = project.copy[locale]

  const index = projects.findIndex((p) => p.id === project.id)
  const next = projects[(index + 1) % projects.length]
  const nextCopy = next.copy[locale]

  return (
    <article>
      {/* Cabecera */}
      <header className="relative overflow-hidden border-b border-line pt-28 pb-14 md:pt-36 md:pb-20">
        <div
          className="grid-veil pointer-events-none absolute inset-0 -z-10 opacity-70"
          aria-hidden="true"
        />

        <div className="shell">
          {/* Al ancla de proyectos, no a la portada a secas: se vuelve a la
              rejilla desde la que se entró, y así la tarjeta de este proyecto
              está en pantalla para que la transición la empareje con el logo. */}
          <Link
            to="/#work"
            morphId={project.id}
            className="group inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
          >
            <ArrowIcon className="size-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            {t.work.detail.back}
          </Link>

          {/* El estado va en esta misma línea. Colgado al final de la cabecera
              quedaba huérfano y abría un hueco muerto antes de la barra de datos. */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-accent">{project.no}</span>
              <span className="h-px w-6 bg-line-strong" />
              <span>{t.work.detail.caseStudy}</span>
              <span className="text-line-strong">/</span>
              <span>{project.year}</span>
            </p>
            <StatusBadge status={project.status} />
          </div>

          <div className="mt-7 flex items-start gap-5 md:gap-8">
            <ProjectMark project={project} title={c.title} />
            <div className="min-w-0 pt-1">
              <Rise
                as="h1"
                className="text-[clamp(1.9rem,5.2vw,3.6rem)] leading-[1.02]"
              >
                {c.title}
              </Rise>
              <p className="mt-4 font-mono text-[0.72rem] leading-relaxed text-muted" data-reveal>
                {c.context}
              </p>
            </div>
          </div>

          <p
            className="mt-9 max-w-3xl text-[clamp(1.05rem,2vw,1.35rem)] leading-relaxed text-ink"
            data-reveal
          >
            {c.summary}
          </p>
        </div>
      </header>

      {/* Datos de un vistazo */}
      <div className="border-b border-line">
        <dl className="shell grid grid-cols-2 gap-x-6 gap-y-6 py-8 md:grid-cols-4" data-reveal-stagger>
          <div>
            <dt className="eyebrow">{t.work.sections.role}</dt>
            <dd className="mt-2 text-sm leading-snug text-ink">{c.role}</dd>
          </div>
          <div>
            <dt className="eyebrow">{t.work.detail.year}</dt>
            <dd className="mt-2 text-sm text-ink">{project.year}</dd>
          </div>
          <div>
            <dt className="eyebrow">{t.work.sections.stack}</dt>
            <dd className="mt-2 text-sm text-ink">{project.stack.length}</dd>
          </div>
          <div>
            <dt className="eyebrow">{t.work.detail.repo}</dt>
            <dd className="mt-2 text-sm">
              {project.link ? (
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline inline-flex items-center gap-1.5 text-accent"
                >
                  {t.work.visit}
                  <ExternalIcon className="size-3.5" />
                </a>
              ) : (
                <span className="text-muted">{t.work.privateNote}</span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      <Chapter no="01" title={t.work.sections.challenge}>
        {/* El reto en grande: es la premisa de todo lo que viene después, y en
            un caso de estudio se lee antes que nada. */}
        <p
          className="border-l-2 border-accent pl-6 text-[clamp(1.15rem,2.4vw,1.6rem)] leading-snug tracking-tight text-ink"
          data-reveal
        >
          {c.challenge}
        </p>
      </Chapter>

      <Chapter no="02" title={t.work.sections.solution}>
        <ol className="grid gap-px bg-line" data-reveal-stagger>
          {c.solution.map((item, i) => (
            <li
              key={i}
              className="group/s flex gap-5 bg-bg py-5 transition-colors duration-400 hover:bg-surface md:gap-7 md:px-1"
            >
              <span className="w-7 shrink-0 pt-1 font-mono text-[0.72rem] tabular-nums text-muted transition-colors duration-300 group-hover/s:text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[1rem] leading-relaxed text-ink-soft">{item}</p>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter no="03" title={t.work.sections.arch} wide>
        <div data-reveal>
          <ArchDiagram nodes={project.arch} />
        </div>
      </Chapter>

      <Chapter no="04" title={t.work.sections.impact} wide>
        <ul className="grid gap-3 sm:grid-cols-2" data-reveal-stagger>
          {c.impact.map((item, i) => (
            <li
              key={i}
              className="group/o relative overflow-hidden rounded-sm border border-line bg-surface p-5 transition-colors duration-400 hover:border-accent/45"
            >
              <span
                className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover/o:scale-y-100"
                aria-hidden="true"
              />
              <p className="font-mono text-[0.6rem] text-line-strong">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{item}</p>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter no="05" title={t.work.sections.stack} wide>
        {/* Rejilla en vez de chips en fila: en la ficha hay sitio para que cada
            tecnología tenga su casilla y el logo se lea de verdad.

            La cuadrícula se dibuja con el borde de cada celda, no con un fondo
            de color y separaciones de un píxel. Con el truco del fondo, cuando
            el número de tecnologías no llena la última fila el hueco sobrante
            queda pintado del color de la línea y parece un bloque roto; así la
            retícula simplemente termina donde termina, en cualquier número de
            columnas. */}
        <ul
          className="fill-row-tech grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-4"
          data-reveal-stagger
        >
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="tech-cell flex items-center gap-3 border-b border-r border-line px-4 py-4 transition-colors duration-400 hover:bg-surface"
            >
              <TechIcon name={tech} className="size-5" />
              <span className="tech-name truncate font-mono text-xs text-ink-soft">{tech}</span>
            </li>
          ))}
        </ul>
      </Chapter>

      {/* Siguiente proyecto: la ficha no termina en un callejón sin salida. */}
      <nav className="border-b border-line">
        <Link
          to={`/proyectos/${next.id}`}
          morphId={next.id}
          className="group block py-14 transition-colors duration-500 hover:bg-surface md:py-20"
        >
          <div className="shell flex items-center justify-between gap-6">
            <div className="flex min-w-0 items-center gap-5">
              {next.logo ? (
                <span className="project-logo grid size-14 shrink-0 place-items-center">
                  <img
                    src={next.logo}
                    alt=""
                    width={56}
                    height={56}
                    className="size-full object-cover"
                  />
                </span>
              ) : (
                <span className="project-logo grid size-14 shrink-0 place-items-center font-mono text-sm text-muted">
                  {next.no}
                </span>
              )}
              <div className="min-w-0">
                <p className="eyebrow">{t.work.detail.next}</p>
                <p className="mt-2 truncate text-[clamp(1.15rem,2.6vw,1.8rem)] font-display leading-tight tracking-tight text-ink transition-colors group-hover:text-accent">
                  {nextCopy.title}
                </p>
              </div>
            </div>
            <ArrowIcon className="size-6 shrink-0 text-muted transition-all duration-400 group-hover:translate-x-1.5 group-hover:text-accent" />
          </div>
        </Link>
      </nav>
    </article>
  )
}
