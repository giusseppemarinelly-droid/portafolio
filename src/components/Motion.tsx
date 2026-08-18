import type { ElementType, ReactNode } from 'react'

/**
 * Revelado tras máscara: el contenido sube desde detrás de su propia caja.
 *
 * Es el gesto que separa una animación cuidada de un simple desvanecido — el
 * texto no aparece de la nada, entra desde fuera del encuadre. Necesita dos
 * elementos: el de fuera recorta y el de dentro se mueve, así que existe este
 * componente en vez de un atributo, para no repetir el envoltorio a mano.
 *
 * El relleno inferior con margen negativo que lo compensa está ahí porque los
 * titulares llevan `leading` por debajo de 1 y la máscara le cortaría la cola a
 * la «g», la «y» y la «p».
 */
export function Rise({
  children,
  as: Tag = 'span',
  className = '',
  innerClassName = '',
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  innerClassName?: string
}) {
  return (
    <Tag className={`block overflow-hidden pb-[0.14em] -mb-[0.14em] ${className}`}>
      <span className={`block ${innerClassName}`} data-rise>
        {children}
      </span>
    </Tag>
  )
}
