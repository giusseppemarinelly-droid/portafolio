export type Locale = 'es' | 'en'

/** Un nodo del diagrama de arquitectura que acompaña a cada proyecto. */
export type ArchKind = 'client' | 'service' | 'data' | 'hardware' | 'external'

export interface ArchNode {
  label: string
  kind: ArchKind
  /** Etiqueta corta del enlace hacia el nodo anterior (HTTP, WS, RS-232…). */
  via?: string
}

export type ProjectStatus = 'production' | 'active' | 'academic'

export interface ProjectCopy {
  title: string
  /** Dónde vive el proyecto: empresa, planta, universidad. */
  context: string
  /** Una frase que explica qué es, para la tarjeta. */
  summary: string
  /** El problema que existía antes. */
  challenge: string
  /** Qué se construyó, en viñetas. */
  solution: string[]
  /** Resultado real y verificable. */
  impact: string[]
  /** Qué parte del sistema hizo esta persona. */
  role: string
}

export interface Project {
  id: string
  /** Numeración editorial: 01, 02, 03… */
  no: string
  year: string
  status: ProjectStatus
  stack: string[]
  arch: ArchNode[]
  /**
   * Icono de la aplicación, servido desde `public/projects/`. Opcional: los
   * proyectos que no tienen uno propio muestran su número en la tarjeta, que es
   * mejor que inventarles un logotipo.
   */
  logo?: string
  link?: { href: string; label: string }
  copy: Record<Locale, ProjectCopy>
}

export interface StackGroup {
  id: string
  label: Record<Locale, string>
  note: Record<Locale, string>
  items: { name: string; level?: 'core' }[]
}

export interface TimelineEntry {
  id: string
  /** El período se traduce entero: «Actualidad» no es «Present» a medias. */
  period: Record<Locale, string>
  copy: Record<Locale, { title: string; place: string; detail: string }>
  tags?: string[]
}
