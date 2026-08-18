import type { SimpleIcon } from 'simple-icons'
import {
  siCelery,
  siClaude,
  siCoolify,
  siDbeaver,
  siDocker,
  siExpo,
  siExpress,
  siFastapi,
  siFlask,
  siGithub,
  siHtml5,
  siLinux,
  siMysql,
  siNginx,
  siNodedotjs,
  siOllama,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siRender,
  siSqlalchemy,
  siSupabase,
  siTailwindcss,
  siTraefikproxy,
  siTypescript,
  siVercel,
  siVite,
  siVuedotjs,
} from 'simple-icons'

/**
 * Logo de marca para cada tecnología que aparece en el sitio.
 *
 * El mapa es explícito a propósito, en vez de resolver el nombre contra el
 * catálogo de simple-icons por parecido: «ReAct» —el patrón de razonamiento de
 * Yao et al.— normaliza igual que «React» y se llevaría el logo de la librería
 * de Facebook, que no tiene nada que ver con el proyecto. Cada fila de aquí es
 * una decisión tomada a mano.
 *
 * Lo que no está en el mapa cae al monograma de `TechIcon`: WebSocket, REST,
 * SQL, Alembic, PySerial, ReportLab, openpyxl, Zustand, CustomTkinter y el
 * propio ReAct no tienen logo de marca, y ponerles uno aproximado sería mentir.
 */
const ICONS: Record<string, SimpleIcon> = {
  // Backend
  'Node.js': siNodedotjs,
  'node-cron': siNodedotjs,
  Express: siExpress,
  Python: siPython,
  FastAPI: siFastapi,
  Flask: siFlask,
  Celery: siCelery,

  // Datos
  PostgreSQL: siPostgresql,
  'PostgreSQL 17': siPostgresql,
  MySQL: siMysql,
  SQLAlchemy: siSqlalchemy,
  Prisma: siPrisma,
  Supabase: siSupabase,
  DBeaver: siDbeaver,

  // Frontend y móvil
  React: siReact,
  'React 18': siReact,
  'React Native': siReact,
  Expo: siExpo,
  'Expo Router': siExpo,
  'Expo Push': siExpo,
  'EAS Update': siExpo,
  TypeScript: siTypescript,
  'Vue 3': siVuedotjs,
  'Tailwind CSS': siTailwindcss,
  NativeWind: siTailwindcss,
  'HTML / CSS': siHtml5,
  Vite: siVite,

  // Infraestructura
  Docker: siDocker,
  'Docker Compose': siDocker,
  Nginx: siNginx,
  Coolify: siCoolify,
  Traefik: siTraefikproxy,
  Vercel: siVercel,
  Render: siRender,
  'Linux / WSL2': siLinux,
  WSL2: siLinux,
  'Git / GitHub': siGithub,

  // IA
  'Claude API': siClaude,
  Ollama: siOllama,
}

export interface TechMark {
  title: string
  /** El trazado del logo, en un lienzo de 24×24. */
  path: string
  /** Color de marca ya llevado a una luminosidad legible en los dos temas. */
  brand: string
}

/**
 * Lleva el color de marca a una banda de luminosidad legible.
 *
 * Los hex oficiales no sirven tal cual: el de Express es `#0A0A0A` y el de
 * Vercel `#000000`, invisibles sobre el fondo oscuro del sitio; y hay marcas
 * casi blancas que desaparecen en el tema claro. Acotar la luminosidad —sin
 * tocar el tono— deja cada logo reconocible en ambos fondos, y las marcas
 * que de verdad son negras acaban en un gris neutro, que es lo correcto.
 */
function legible(hex: string): string {
  const n = parseInt(hex, 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))

  let h = 0
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h = (h * 60 + 360) % 360
  }

  const safeL = Math.min(0.72, Math.max(0.52, l))
  return `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(safeL * 100)}%)`
}

const cache = new Map<string, TechMark | null>()

/** Devuelve el logo de una tecnología, o `null` si toca usar el monograma. */
export function techMark(name: string): TechMark | null {
  if (cache.has(name)) return cache.get(name) ?? null

  const icon = ICONS[name]
  const mark = icon ? { title: icon.title, path: icon.path, brand: legible(icon.hex) } : null
  cache.set(name, mark)
  return mark
}
