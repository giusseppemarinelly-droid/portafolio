import { Fragment } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import type { ArchKind, ArchNode } from '../data/types'

/** Cada capa del sistema tiene su color; así el diagrama no queda en un solo tono. */
const kindStyles: Record<ArchKind, { dot: string; border: string }> = {
  client: { dot: 'bg-cool', border: 'border-cool/35' },
  service: { dot: 'bg-accent', border: 'border-accent/40' },
  data: { dot: 'bg-ink', border: 'border-line-strong' },
  hardware: { dot: 'bg-clay', border: 'border-clay/40' },
  external: { dot: 'bg-muted', border: 'border-line' },
}

/** De arriba abajo: quien pide, quien responde, dónde se guarda, con qué habla. */
const LAYER_ORDER: ArchKind[] = ['client', 'service', 'data', 'hardware', 'external']

function groupByLayer(nodes: ArchNode[]) {
  return LAYER_ORDER.map((kind) => ({
    kind,
    items: nodes.filter((node) => node.kind === kind),
  })).filter((layer) => layer.items.length > 0)
}

/**
 * Diagrama en capas para la ficha ampliada.
 *
 * Antes era una cadena horizontal de nodos con flechas; al no caber se partía
 * a mitad de camino y las flechas quedaban sueltas al final de la línea. Aquí
 * cada capa ocupa su propia fila, así que el diagrama se estrecha sin romperse
 * y además dice explícitamente qué papel cumple cada pieza.
 */
export function ArchDiagram({ nodes }: { nodes: ArchNode[] }) {
  const { t } = useI18n()
  const layers = groupByLayer(nodes)

  return (
    <ol
      className="relative space-y-6 border-l border-line pl-6"
      aria-label={layers.map((l) => `${t.work.layers[l.kind]}: ${l.items.map((n) => n.label).join(', ')}`).join(' · ')}
    >
      {layers.map((layer) => (
        <li key={layer.kind} className="relative">
          <span
            className={`absolute -left-[1.8rem] top-1 size-2.5 rounded-full ring-4 ring-bg ${kindStyles[layer.kind].dot}`}
            aria-hidden="true"
          />
          <p className="eyebrow">{t.work.layers[layer.kind]}</p>

          <ul className="mt-2.5 flex flex-wrap gap-2">
            {layer.items.map((node) => (
              <li
                key={node.label}
                className={`inline-flex items-baseline gap-2.5 rounded-sm border bg-surface px-3 py-2 ${kindStyles[layer.kind].border}`}
              >
                <span className="font-mono text-xs tracking-tight text-ink">{node.label}</span>
                {node.via && (
                  <span className="font-mono text-[0.62rem] text-muted">{node.via}</span>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

/**
 * Versión de una sola línea para la tarjeta: solo la forma del sistema, sin
 * los nombres concretos — esos ya están en los chips de tecnologías de abajo.
 */
export function ArchPath({ nodes }: { nodes: ArchNode[] }) {
  const { t } = useI18n()
  const layers = groupByLayer(nodes)

  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
      {layers.map((layer, i) => (
        <Fragment key={layer.kind}>
          {i > 0 && (
            <span className="text-line-strong" aria-hidden="true">
              /
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <span
              className={`size-1.5 rounded-full ${kindStyles[layer.kind].dot}`}
              aria-hidden="true"
            />
            {t.work.layers[layer.kind]}
            <span className="text-line-strong">{layer.items.length}</span>
          </span>
        </Fragment>
      ))}
    </p>
  )
}
