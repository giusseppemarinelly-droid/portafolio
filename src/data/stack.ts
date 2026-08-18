import type { StackGroup } from './types'

/** `level: 'core'` marca las herramientas del día a día; el resto se atenúa. */
export const stackGroups: StackGroup[] = [
  {
    id: 'backend',
    label: { es: 'Backend & APIs', en: 'Backend & APIs' },
    note: {
      es: 'Donde vive la lógica de negocio y las reglas que nadie puede saltarse desde el cliente.',
      en: 'Where business logic lives, and the rules a client can never bypass.',
    },
    items: [
      { name: 'Node.js', level: 'core' },
      { name: 'Express', level: 'core' },
      { name: 'Python', level: 'core' },
      { name: 'FastAPI', level: 'core' },
      { name: 'Flask' },
      { name: 'REST' },
      { name: 'WebSocket' },
      { name: 'JWT / bcrypt' },
      { name: 'Celery' },
      { name: 'node-cron' },
    ],
  },
  {
    id: 'data',
    label: { es: 'Datos & Modelado', en: 'Data & Modelling' },
    note: {
      es: 'Modelo relacional primero: si el esquema está bien, el resto del sistema se sostiene solo.',
      en: 'Relational model first: get the schema right and the rest of the system holds itself up.',
    },
    items: [
      { name: 'PostgreSQL', level: 'core' },
      { name: 'MySQL' },
      { name: 'SQL', level: 'core' },
      { name: 'SQLAlchemy', level: 'core' },
      { name: 'Alembic' },
      { name: 'Prisma' },
      { name: 'Supabase' },
      { name: 'DBeaver' },
      { name: 'Modelado E-R' },
    ],
  },
  {
    id: 'frontend',
    label: { es: 'Frontend & Móvil', en: 'Frontend & Mobile' },
    note: {
      es: 'Una sola base de código que se compila a Android y a web cuando el proyecto lo permite.',
      en: 'One codebase compiling to both Android and web whenever the project allows it.',
    },
    items: [
      { name: 'React', level: 'core' },
      { name: 'React Native', level: 'core' },
      { name: 'Expo' },
      { name: 'TypeScript', level: 'core' },
      { name: 'Vue 3' },
      { name: 'Tailwind CSS', level: 'core' },
      { name: 'NativeWind' },
      { name: 'HTML / CSS' },
      { name: 'Zustand' },
      { name: 'Vite' },
    ],
  },
  {
    id: 'infra',
    label: { es: 'Infraestructura & Flujo', en: 'Infrastructure & Workflow' },
    note: {
      es: 'Construir no basta: hay que desplegarlo, mantenerlo y poder reproducirlo en otra máquina.',
      en: 'Building is not enough — it has to ship, stay up, and be reproducible on another machine.',
    },
    items: [
      { name: 'Docker', level: 'core' },
      { name: 'Docker Compose' },
      { name: 'Linux / WSL2', level: 'core' },
      { name: 'Nginx' },
      { name: 'Coolify' },
      { name: 'Vercel' },
      { name: 'Render' },
      { name: 'Git / GitHub', level: 'core' },
      { name: 'EAS Update' },
      { name: 'Claude API' },
    ],
  },
]
