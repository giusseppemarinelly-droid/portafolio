import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  /** Numeración editorial de la sección: 01, 02… */
  no: string
  label: string
  heading: string
  lede?: string
  children: ReactNode
  /** La cabecera ocupa una columna estrecha y el contenido el resto. */
  aside?: ReactNode
}

export function Section({ id, no, label, heading, lede, children, aside }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="shell">
        <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4" data-reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">{no}</span>
              <span className="h-px w-8 bg-line-strong" />
              {label}
            </p>
          </div>
          {/* Titular, entradilla y filtros entran en cascada como un bloque:
              son una sola unidad de lectura, no tres elementos independientes. */}
          <div className="md:col-span-8" data-reveal-stagger>
            <h2 className="max-w-2xl text-[clamp(1.85rem,4.2vw,3rem)]">{heading}</h2>
            {lede && (
              <p className="mt-5 max-w-xl text-[0.975rem] leading-relaxed text-muted">{lede}</p>
            )}
            {aside}
          </div>
        </header>
        {children}
      </div>
    </section>
  )
}
