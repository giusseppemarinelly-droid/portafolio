import { stackGroups } from '../data/stack'

/** Todas las herramientas, en el orden en que están agrupadas. */
const items = stackGroups.flatMap((group) => group.items.map((item) => item.name))

/**
 * Cinta continua de tecnologías entre el hero y el resto del sitio.
 * Se pinta dos veces: la animación desplaza exactamente el ancho de una copia,
 * así el bucle no tiene salto. La segunda copia es decorativa para el lector
 * de pantalla — el contenido real ya está en la sección de stack.
 */
export function Ticker() {
  return (
    <div className="ticker-mask relative overflow-hidden border-t border-line py-3.5">
      <div className="animate-ticker flex w-max" style={{ ['--ticker-duration' as string]: '70s' }}>
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 ? 'true' : undefined}
          >
            {items.map((name) => (
              <li
                key={name}
                className="flex items-center gap-6 whitespace-nowrap px-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted"
              >
                {name}
                <span className="size-1 rounded-full bg-accent/60" aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
