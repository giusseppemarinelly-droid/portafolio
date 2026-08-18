import { techMark } from '../data/techIcons'

type Fallback = 'mono' | 'none'

/**
 * Logo de una tecnología, o su monograma si la marca no tiene logo.
 *
 * El color de marca viaja como variable CSS en vez de aplicarse directamente:
 * así el logo hereda el color del texto en reposo —una fila de logos a un solo
 * tono se lee como parte del diseño, no como una pared de calcomanías— y solo
 * toma su color real cuando el chip se señala con el cursor.
 *
 * `fallback` decide qué pasa con lo que no tiene logo. En el stack y en las
 * tarjetas de proyecto conviene `mono`, para que todos los chips midan igual y
 * la fila no quede desalineada. En la trayectoria conviene `none`: ahí las
 * etiquetas son asignaturas —«Algoritmos», «Redes»— y un recuadro con su
 * inicial se leería como un logotipo que no existe.
 */
export function TechIcon({
  name,
  className = 'size-4',
  fallback = 'mono',
}: {
  name: string
  className?: string
  fallback?: Fallback
}) {
  const mark = techMark(name)

  if (!mark) {
    if (fallback === 'none') return null
    const initial = name.replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase()
    return (
      <span
        className={`tech-mono grid shrink-0 place-items-center rounded-[3px] font-mono ${className}`}
        aria-hidden="true"
      >
        {initial || '·'}
      </span>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={`tech-logo shrink-0 ${className}`}
      style={{ ['--brand' as string]: mark.brand }}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={mark.path} />
    </svg>
  )
}

/** Chip de tecnología: logo más nombre. */
export function TechChip({
  name,
  core = false,
  fallback = 'mono',
}: {
  name: string
  core?: boolean
  fallback?: Fallback
}) {
  return (
    <span className={`chip tech-chip ${core ? 'chip-core' : ''}`}>
      <TechIcon name={name} className="size-3.5" fallback={fallback} />
      {name}
    </span>
  )
}
